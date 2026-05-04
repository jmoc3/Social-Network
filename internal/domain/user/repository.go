package user

import "context"

type Repository interface {
	FindAll(ctx context.Context) ([]User, error)
	FindOne(ctx context.Context, id string) (*User, error)
	Save(ctx context.Context, user User) (*User, error)
	Update(ctx context.Context, id string, user UpdateUserRequest) (string, error)
	Delete(ctx context.Context, id string) (*User, error)
}

type UserResponse struct {
}

type UpdateUserRequest struct {
	Name *string
	Age  *int
}
