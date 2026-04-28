package mongo

import (
	"context"
	"errors"

	"github.com/jmoc3/Social-Network.git/internal/domain/post"
	"github.com/jmoc3/Social-Network.git/internal/infrastructure/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
	var post *post.Post
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	err = collection.FindOne(ctx, bson.M{"_id": objectId}).Decode(&post)
	if err != nil {
		return nil, err
	}

	return post, nil
}

func (pr *postRepository) Save(ctx context.Context, post *post.Post) (string, error) {
	collection := pr.db.DB.Collection("posts")
	result, err := collection.InsertOne(ctx, post)
	if err != nil {
		return "", err
	}
	objectId, ok := result.InsertedID.(primitive.ObjectID)
	if !ok {
		return "", errors.New("Failed to convert inserted ID")
	}

	id := objectId.Hex()

	return id, nil
}

func (pr *postRepository) Update(ctx context.Context, id string, post *post.Post) (string, error) {
	collection := pr.db.DB.Collection("posts")
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return "", err
	}
	_, err = collection.UpdateOne(ctx, bson.M{"_id": objectId}, bson.M{"$set": post})
	if err != nil {
		return "", err
	}
	return id, nil
}

func (pr *postRepository) Delete(ctx context.Context, id string) error {
	return nil
}
