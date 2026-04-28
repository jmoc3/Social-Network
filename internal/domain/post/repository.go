package post

import (
	"context"
)

type Repository interface {
	FindAll(ctx context.Context) ([]*Post, error)
	FindOne(ctx context.Context, id string) (*Post, error)
	Save(ctx context.Context, post *Post) (string, error)
	Update(ctx context.Context, post *Post) error
	Delete(ctx context.Context, id string) error
}
