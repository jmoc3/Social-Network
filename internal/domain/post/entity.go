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
	Id      string
	Content string
	UserId  string
	User    *user.User
}

func NewPost(content, userId string) (*Post, error) {
	if userId == "" {
		return nil, ErrPostInvalidUserId
	}

	return &Post{
		Content: content,
		UserId:  userId,
	}, nil
}
