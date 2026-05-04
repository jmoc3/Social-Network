package user

import (
	"context"
)

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{
		repo: repo,
	}
}

func (s *Service) FindAll(ctx context.Context) ([]User, error) {
	users, err := s.repo.FindAll(ctx)
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (s *Service) FindOne(ctx context.Context, id string) (*User, error) {
	user, err := s.repo.FindOne(ctx, id)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *Service) Save(ctx context.Context, user User) (*User, error) {
	userCreated, err := s.repo.Save(ctx, user)
	if err != nil {
		return nil, err
	}

	return userCreated, nil
}

func (s *Service) Update(ctx context.Context, id string, userRequest UpdateUserRequest) (string, error) {
	idUpdated, err := s.repo.Update(ctx, id, userRequest)
	if err != nil {
		return "", err
	}

	return idUpdated, nil
}

func (s *Service) Delete(ctx context.Context, id string) (*User, error) {
	user, err := s.repo.Delete(ctx, id)
	if err != nil {
		return nil, err
	}

	return user, nil
}
