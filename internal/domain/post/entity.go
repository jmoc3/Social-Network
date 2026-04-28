package post

import (
	"errors"

	"github.com/jmoc3/Social-Network.git/internal/domain/user"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var (
	ErrPostNotFound      = errors.New("Post no encontrado")
	ErrPostInvalidUserId = errors.New("Usuario no diligenciado")
	ErrPostGeneral       = errors.New("Error en procesos con posts de la base de datos")
)

type Post struct {
	Id      primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Content string             `json:"content" bson:"content"`
	UserId  int                `json:"user_id" bson:"user_id"`
	User    *user.User         `json:"user" bson:"user"`
}

func NewPost(content string, userId *int) (*Post, error) {
	if userId == nil {
		return nil, ErrPostInvalidUserId
	}

	return &Post{
		Content: content,
		UserId:  *userId,
	}, nil
}
