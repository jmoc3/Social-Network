package postgres

import "github.com/jmoc3/Social-Network.git/internal/infrastructure/database"

type UserRepository struct {
	db *database.PostgresDatabase
}

func NewUserRepository(db *database.PostgresDatabase) *UserRepository {
	return &UserRepository{
		db: db,
	}
}

func (r UserRepository) FindAll() {
}

func (r UserRepository) FindOne() {
}

func (r UserRepository) Save() {
}

func (r UserRepository) Update() {
}

func (r UserRepository) Delete() {
}
