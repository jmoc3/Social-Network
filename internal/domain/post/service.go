package post

import "context"

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) Create(ctx context.Context, content, userId string) (*Post, error) {

	post, err := NewPost(content, userId)
	if err != nil {
		return nil, err
	}

	if err := s.repo.Save(ctx, post); err != nil {
		return nil, err
	}

	return post, nil

}
