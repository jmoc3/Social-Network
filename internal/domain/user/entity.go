package user

import (
	"errors"
	"time"
)

var (
	ErrUserInvalidPassword = errors.New("Contraseña invalida")
	ErrUserInvalidEmail    = errors.New("Contraseña invalida")
)

type UserBase struct {
	Id        int
	Name      string
	Age       int
	Email     string
	CreatedAt time.Time
	UpdatedAt time.Time
}
