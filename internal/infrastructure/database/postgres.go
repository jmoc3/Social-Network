package database

import (
	"context"
	"os"

	"github.com/jackc/pgx/v5"
)

type PostgresDatabase struct {
	conn *pgx.Conn
}

func NewPostgressConnection() *PostgresDatabase {
	ctx := context.Background()
	POSTGRES_URI := os.Getenv("POSTGRES_URI")
	conn, err := pgx.Connect(ctx, POSTGRES_URI)
	if err != nil {
		return nil
	}
	defer conn.Close(ctx)

	return &PostgresDatabase{
		conn: conn,
	}
}
