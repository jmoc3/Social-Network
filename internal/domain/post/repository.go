package post

import (
	"context"
)

type Repository interface {
	FindAll(ctx context.Context) ([]*Post, error)
	Save(ctx context.Context, post *Post) error
	Update(ctx context.Context, post *Post) error
	Delete(ctx context.Context, id string) error
}
