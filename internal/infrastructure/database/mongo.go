package database

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoDatabase struct {
	Client *mongo.Client
	DB     *mongo.Database
}

func NewMongoConnection(uri, database string) *MongoDatabase {
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(context.Background(), clientOptions)

	if err != nil {
		log.Fatal("Error connecting to mongo")
	}

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to mongo atlas")

	return &MongoDatabase{
		Client: client,
		DB:     client.Database(database),
	}
}
