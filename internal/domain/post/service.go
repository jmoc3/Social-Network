package post

import (
	"errors"
)

var (
	ErrPostNotFound = errors.New("Post no encontrado")
	ErrPostGeneral  = errors.New("Error en procesos con posts de la base de datos")
)

type Post struct {
}
