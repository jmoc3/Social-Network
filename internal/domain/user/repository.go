package user

import "context"

type Repository interface {
	FindAll(ctx context.Context) ([]*User, error)
	FindOne(ctx context.Context, id string) (*User, error)
	Save(ctx context.Context, user *User) (string, error)
	Update(ctx context.Context, id string, user *User) (string, error)
	Delete(ctx context.Context, id string) error
}
