package post

import (
	"errors"

	"github.com/jmoc3/Social-Network.git/internal/domain/user"
)

var (
	ErrPostNotFound      = errors.New("Post no encontrado")
	ErrPostInvalidUserId = errors.New("Usuario no diligenciado")
	ErrPostGeneral       = errors.New("Error en procesos con posts de la base de datos")
)

type Post struct {
	Id      string `json:"_id" bson:"_id"`
	Content string `json:"content" bson:"content"`
	UserId  int    `json:"user_id" bson:"user_id"`
	User    *user.User
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
