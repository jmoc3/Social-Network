package post

import "context"

type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) FindAll(ctx context.Context) ([]*Post, error) {
	posts, err := s.repo.FindAll(ctx)
	if err != nil {
		return posts, err
	}
	return posts, nil
}

func (s *Service) FindOne(ctx context.Context, id string) (*Post, error) {
	post, err := s.repo.FindOne(ctx, id)
	if err != nil {
		return nil, err
	}

	return post, nil
}

func (s *Service) Create(ctx context.Context, content string, userId *int) (*Post, error) {

	post, err := NewPost(content, userId)
	if err != nil {
		return nil, err
	}

	if err := s.repo.Save(ctx, post); err != nil {
		return nil, err
	}

	return post, nil

}
