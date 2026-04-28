package mongo

import (
	"context"

	"github.com/jmoc3/Social-Network.git/internal/domain/post"
	"github.com/jmoc3/Social-Network.git/internal/infrastructure/database"
	"go.mongodb.org/mongo-driver/bson"
)

type postRepository struct {
	db *database.MongoDatabase
}

func NewPostRepository(db *database.MongoDatabase) post.Repository {
	return &postRepository{db: db}
}

func (pr *postRepository) FindAll(ctx context.Context) ([]*post.Post, error) {
	var posts []*post.Post
	collection := pr.db.DB.Collection("posts")
	cursor, err := collection.Find(ctx, &bson.M{})
	if err != nil {
		return posts, err
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var post *post.Post
		if err := cursor.Decode(&post); err != nil {
			return posts, err
		}

		posts = append(posts, post)
	}

	return posts, nil
}

func (pr *postRepository) FindOne(ctx context.Context, id string) (*post.Post, error) {
	collection := pr.db.DB.Collection("posts")
	collection.FindOne(ctx, bson.M{"_id": id})
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
