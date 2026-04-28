package user

import (
	"errors"
	"strings"
	"time"
)

var (
	ErrUserInvalidPassword = errors.New("Contraseña invalida")
	ErrUserInvalidEmail    = errors.New("Contraseña invalida")
)

type User struct {
	Id        int
	Name      string
	Age       int
	Email     string
	Password  string
	CreatedAt time.Time
	UpdatedAt time.Time
}

func NewUser(name string, age int, email, password string) (*User, error) {

	if err := validateEmail(email); err != nil {
		return nil, err
	}

	if password == "" {
		return nil, ErrUserInvalidPassword
	}

	return &User{
		Name:      name,
		Age:       age,
		Email:     email,
		Password:  password,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}, nil

}

func validateEmail(email string) error {
	if len(email) < 3 || !strings.Contains(email, "@") {
		return ErrUserInvalidEmail
	}

	return nil
}
