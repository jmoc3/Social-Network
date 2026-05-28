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

func (r UserRepository) FindAll(ctx context.Context) ([]user.UserBase, error) {
	cursor, err := r.db.Conn.Query(ctx, "Select id, name, age, email, created_at, updated_at FROM users")
	if err != nil {
		return nil, err
	}
	var users []user.UserBase
	defer cursor.Close()

	for cursor.Next() {
		var user user.UserBase
		if err := cursor.Scan(&user.Id, &user.Name, &user.Age, &user.Email, &user.CreatedAt, &user.UpdatedAt); err != nil {
			return nil, err
		}

		users = append(users, user)
	}

	return users, nil
}

func (r UserRepository) FindOne(ctx context.Context, id string) (*user.UserBase, error) {
	var user user.UserBase
	err := r.db.Conn.QueryRow(ctx, "SELECT id, age, name, email, created_at, updated_at FROM users WHERE id = $1", id).Scan(&user.Id, &user.Age, &user.Name, &user.Email, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r UserRepository) FindBy(ctx context.Context, fields []string, table string, filter string) ([]any, error) {

	fieldString := ""
	for i, v := range fields {
		fieldString += v
		if i+1 != len(fields) {
			fieldString += ", "
		}
	}
	var response []any

	rows, err := r.db.Conn.Query(ctx, fmt.Sprintf("SELECT %s FROM %s WHERE %s", fieldString, table, filter))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		fields := rows.FieldDescriptions()
		values := make([]any, len(fields))
		pointers := make([]any, len(fields))

		for i := range values {
			pointers[i] = &values[i]
		}

		err := rows.Scan(pointers...)
		if err != nil {
			fmt.Println("Error aaa", err)
			return nil, err
		}

		var record = make(map[string]any)
		for i, v := range fields {
			record[v.Name] = values[i]
		}
		response = append(response, record)
	}
	return response, nil
}

func (r UserRepository) Save(ctx context.Context, userRequest user.User) (*user.UserBase, error) {
	var userInserted user.UserBase
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

func (r UserRepository) Update(ctx context.Context, id int, userRequest user.UpdateUserRequest) (int, error) {
	query := "UPDATE users SET "
	args := []any{}
	i := 1

	if userRequest.Name != nil {
		query += fmt.Sprintf("name=$%d, ", i)
		args = append(args, userRequest.Name)
		i++
	}

	if userRequest.Age != nil {
		query += fmt.Sprintf("age=$%d ", i)
		args = append(args, userRequest.Age)
		i++
	}

	query += fmt.Sprintf("WHERE id = %d", id)

	_, err := r.db.Conn.Exec(ctx, query, args...)
	if err != nil {
		return 0, err
	}

	return id, nil
}

func (r UserRepository) Delete(ctx context.Context, id string) (*user.UserBase, error) {
	var user user.UserBase
	err := r.db.Conn.QueryRow(ctx, "DELETE FROM users WHERE id = $1 RETURNING id, name, age, email", id).Scan(&user.Id, &user.Name, &user.Age, &user.Email)
	if err != nil {
		return nil, err
	}

	return &user, nil
}
