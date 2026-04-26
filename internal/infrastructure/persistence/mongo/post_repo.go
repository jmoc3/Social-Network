package mongo

import (
	"context"

	"github.com/jmoc3/Social-Network.git/internal/domain/post"
	"github.com/jmoc3/Social-Network.git/internal/infrastructure/database"
)

type postRepository struct {
	db *database.MongoDatabase
}

func NewPostRepository(db *database.MongoDatabase) post.Repository {
	return &postRepository{db: db}
}

func (pr *postRepository) FindAll(ctx context.Context) ([]*post.Post, error) {
	return nil, nil
}

func (pr *postRepository) Save(ctx context.Context, post *post.Post) error {
	return nil
}

func (pr *postRepository) Update(ctx context.Context, post *post.Post) error {
	return nil
}

func (pr *postRepository) Delete(ctx context.Context, id string) error {
	return nil
}
