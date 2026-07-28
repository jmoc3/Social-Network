package statistic

import (
	"context"
)

type Repository interface {
	FindAll(ctx context.Context) ([]*Statistic, error)
	FindOne(ctx context.Context, id string) (*Statistic, error)
	Save(ctx context.Context, statistic *Statistic) (string, error)
	Update(ctx context.Context, id string, statistic *Statistic) (string, error)
	Delete(ctx context.Context, id string) error
}
