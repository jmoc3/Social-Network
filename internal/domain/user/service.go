package user

import (
	"context"
	"errors"
	"fmt"

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
		return false, errors.New("Password doesnt match")
	}

	bytes, err := bcrypt.GenerateFromPassword([]byte(body.Password), 14)

	if err != nil {
		return false, err
	}

	body.Password = string(bytes)

	_, err = s.Save(ctx, User{
		UserBase: UserBase{
			Id:    body.Id,
			Email: body.Email,
			Name:  body.Name,
			Age:   body.Age,
		},
		Password: body.Password,
	})

	if err != nil {
		return false, errors.New("Error created new User")
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
		return false, errors.New("User not Found")
	}

	psw := rows[0]["password"]
	err = bcrypt.CompareHashAndPassword([]byte(psw.(string)), []byte(body.Password))
	equalPsw := err == nil

	if !equalPsw {
		return false, errors.New("Incorrect password")
	}

	return true, nil
}

func (s *Service) Save(ctx context.Context, user User) (*UserBase, error) {
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
