package mongo

import (
	"context"
	"errors"

	"github.com/jmoc3/Social-Network.git/internal/domain/statistic"
	"github.com/jmoc3/Social-Network.git/internal/infrastructure/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type StatisticRepository struct {
	db *database.MongoDatabase
}

func NewStatisticRepository(db *database.MongoDatabase) statistic.Repository {
	return &StatisticRepository{db: db}
}

func (sr *StatisticRepository) FindAll(ctx context.Context) ([]*statistic.Statistic, error) {
	var statistics []*statistic.Statistic
	collection := sr.db.DB.Collection("statistics")
	cursor, err := collection.Find(ctx, &bson.M{})
	if err != nil {
		return statistics, err
	}
	defer cursor.Close(ctx)

	for cursor.Next(ctx) {
		var statistic *statistic.Statistic
		if err := cursor.Decode(&statistic); err != nil {
			return statistics, err
		}

		statistics = append(statistics, statistic)
	}

	return statistics, nil
}

func (sr *StatisticRepository) FindOne(ctx context.Context, id string) (*statistic.Statistic, error) {
	collection := sr.db.DB.Collection("statistics")
	var statistic *statistic.Statistic
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	err = collection.FindOne(ctx, bson.M{"_id": objectId}).Decode(&statistic)
	if err != nil {
		return nil, err
	}

	return statistic, nil
}

func (sr *StatisticRepository) Save(ctx context.Context, statistic *statistic.Statistic) (string, error) {
	collection := sr.db.DB.Collection("statistics")
	result, err := collection.InsertOne(ctx, statistic)
	if err != nil {
		return "", err
	}

	objectId, ok := result.InsertedID.(primitive.ObjectID)
	if !ok {
		return "", errors.New("failed to convert inserted ID to ObjectID")
	}

	id := objectId.Hex()

	return id, nil
}

func (sr *StatisticRepository) Update(ctx context.Context, id string, statistic *statistic.Statistic) (string, error) {
	collection := sr.db.DB.Collection("statistics")
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return "", err
	}

	_, err = collection.UpdateOne(ctx, bson.M{"_id": objectId}, bson.M{"$set": statistic})
	if err != nil {
		return "", err
	}

	return id, nil
}

func (sr *StatisticRepository) Delete(ctx context.Context, id string) error {
	collection := sr.db.DB.Collection("statistics")
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}
	_, err = collection.DeleteOne(ctx, bson.M{"_id": objectId})
	if err != nil {
		return err
	}

	return nil
}
