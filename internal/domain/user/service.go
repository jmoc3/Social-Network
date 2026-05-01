package user

import "context"

type UserService struct {
	repo Repository
}

func NewUserService(repo Repository) *UserService {
	return &UserService{
		repo: repo,
	}
}

func (s *UserService) FindAll(ctx context.Context) ([]*User, error) {
	users, err := s.repo.FindAll(ctx)
	if err != nil {
		return nil, err
	}

	return users, nil
}

func (s *UserService) FindOne(ctx context.Context, id string) (*User, error) {
	user, err := s.repo.FindOne(ctx, id)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *UserService) Save(ctx context.Context, user *User) (string, error) {
	userId, err := s.repo.Save(ctx, user)
	if err != nil {
		return "", err
	}

	return userId, nil
}

func (s *UserService) Update(ctx context.Context, id string, user *User) (string, error) {
	userId, err := s.repo.Update(ctx, id, user)
	if err != nil {
		return "", nil
	}

	return userId, nil
}
