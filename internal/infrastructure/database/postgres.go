package database

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5"
)

type PostgresDatabase struct {
	Conn *pgx.Conn
}

func NewPostgressConnection(uri string) *PostgresDatabase {
	ctx := context.Background()
	conn, err := pgx.Connect(ctx, uri)
	if err != nil {
		return nil
	}
	fmt.Println("Connected to postgres")

	return &PostgresDatabase{
		Conn: conn,
	}
}
