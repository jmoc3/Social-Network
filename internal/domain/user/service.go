package user

import (
	"context"
	"errors"
	"fmt"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{
		repo: repo,
	}
}

func (s *Service) FindAll(ctx context.Context) ([]UserBase, error) {
	users, err := s.repo.FindAll(ctx)
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (s *Service) FindOne(ctx context.Context, id string) (*UserBase, error) {
	user, err := s.repo.FindOne(ctx, id)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *Service) Register(ctx context.Context, body RegisterDTO) (bool, error) {

	if body.ConfirmPassword != body.Password {
		return false, errors.New("Las contraseñas no coinciden")
	}

	bytes, err := bcrypt.GenerateFromPassword([]byte(body.Password), 14)

	if err != nil {
		return false, err
	}

	body.Password = string(bytes)

	_, err = s.Save(ctx, SaveUserDTO{
		Email:       body.Email,
		Name:        body.Name,
		DateOfBirth: body.DateOfBirth,
		Password:    body.Password,
	})

	if err != nil {

		if strings.Contains(err.Error(), "users_date_of_birth_check") {
			return false, errors.New("Usuario debe ser mayor a 12 años")
		}

		if strings.Contains(err.Error(), "users_email_key") {
			return false, errors.New("Correo ya registrado")
		}

		return false, fmt.Errorf("Error creating user: %w", err)
	}

	return true, nil
}

func (s *Service) Login(ctx context.Context, body LoginDTO) (bool, error) {
	filter := fmt.Sprintf("email = '%s'", body.Email)

	rows, err := s.repo.FindBy(ctx, []string{"password"}, "users", filter)
	if err != nil {
		return false, err
	}

	if len(rows) == 0 {
		return false, errors.New("Usuario no encontrado")
	}

	psw := rows[0]["password"]
	err = bcrypt.CompareHashAndPassword([]byte(psw.(string)), []byte(body.Password))
	equalPsw := err == nil

	if !equalPsw {
		return false, errors.New("Contraseña incorrecta")
	}

	return true, nil
}

func (s *Service) Save(ctx context.Context, user SaveUserDTO) (*UserBase, error) {
	userCreated, err := s.repo.Save(ctx, user)
	if err != nil {
		return nil, err
	}

	return userCreated, nil
}

func (s *Service) Update(ctx context.Context, id int, userRequest UpdateUserRequest) (int, error) {
	idUpdated, err := s.repo.Update(ctx, id, userRequest)
	if err != nil {
		return 0, err
	}

	return idUpdated, nil
}

func (s *Service) Delete(ctx context.Context, id string) (*UserBase, error) {
	user, err := s.repo.Delete(ctx, id)
	if err != nil {
		return nil, err
	}

	return user, nil
}
