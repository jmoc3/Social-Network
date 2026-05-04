package postgres

import (
	"context"
	"fmt"

	"github.com/jmoc3/Social-Network.git/internal/domain/user"
	"github.com/jmoc3/Social-Network.git/internal/infrastructure/database"
)

type UserRepository struct {
	db *database.PostgresDatabase
}

func NewUserRepository(db *database.PostgresDatabase) user.Repository {
	return &UserRepository{
		db: db,
	}
}

func (r UserRepository) FindAll(ctx context.Context) ([]user.User, error) {
	cursor, err := r.db.Conn.Query(ctx, "Select id, name, age, email, created_at, updated_at FROM users")
	if err != nil {
		return nil, err
	}
	var users []user.User
	defer cursor.Close()

	for cursor.Next() {
		var user user.User
		if err := cursor.Scan(&user.Id, &user.Name, &user.Age, &user.Email, &user.CreatedAt, &user.UpdatedAt); err != nil {
			return nil, err
		}

		users = append(users, user)
	}

	return users, nil
}

func (r UserRepository) FindOne(ctx context.Context, id string) (*user.User, error) {
	var user user.User
	err := r.db.Conn.QueryRow(ctx, "SELECT id, age, name, email, created_at, updated_at FROM users WHERE id = $1", id).Scan(&user.Id, &user.Age, &user.Name, &user.Email, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r UserRepository) Save(ctx context.Context, userRequest user.User) (*user.User, error) {
	var userInserted user.User
	err := r.db.Conn.QueryRow(ctx, `INSERT INTO users(name, age, email, password) 
		VALUES ($1, $2, $3, $4)
		RETURNING id, name, age, email, created_at`,
		userRequest.Name, userRequest.Age, userRequest.Email, userRequest.Password).
		Scan(&userInserted.Id, &userInserted.Name, &userInserted.Age, &userInserted.Email, &userInserted.CreatedAt)

	if err != nil {
		return nil, err
	}

	return &userInserted, nil
}

func (r UserRepository) Update(ctx context.Context, id string, userRequest user.UpdateUserRequest) (string, error) {
	query := "UPDATE users SET "
	args := []any{}
	i := 1

	if userRequest.Name != nil {
		query += fmt.Sprintf("name=$%d, ", i)
		args = append(args, userRequest.Name)
		i++
	}

	if userRequest.Age != nil {
		query += fmt.Sprintf("age=$%d", i)
		args = append(args, userRequest.Age)
		i++
	}

	_, err := r.db.Conn.Exec(ctx, query, args...)
	if err != nil {
		return "", err
	}

	return id, nil
}

func (r UserRepository) Delete(ctx context.Context, id string) (*user.User, error) {
	var user user.User
	err := r.db.Conn.QueryRow(ctx, "DELETE FROM users WHERE id = $1 RETURNING id, name, email", id).Scan(&user.Id, &user.Name, &user.Email)
	if err != nil {
		return nil, err
	}

	return &user, nil
}
