package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/jmoc3/Social-Network.git/internal/infrastructure/database"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	Id    primitive.ObjectID `json:"_id" bson:"_id"`
	Name  string             `json:"name"`
	Age   int                `json:"age"`
	Email string             `json:"email"`
}

func main() {
	fmt.Println("Hello world")
	app := fiber.New()
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env")
	}

	PORT := os.Getenv("PORT")
	MONGO_URI := os.Getenv("MONGO_URI")
	mongo_client := database.NewMongoConnection(MONGO_URI, "social_network")
	defer mongo_client.Client.Disconnect(context.Background())

	collection := mongo_client.DB.Collection("users")

	app.Get("/users", func(ctx *fiber.Ctx) error {
		var collections []User
		cursor, err := collection.Find(context.Background(), bson.M{})

		if err != nil {
			log.Fatal("Error fetching the users - ", err)
		}

		defer cursor.Close(context.Background())

		for cursor.Next(context.Background()) {
			var user User
			if err := cursor.Decode(&user); err != nil {
				return err
			}

			collections = append(collections, user)
		}
		fmt.Println("Fetching people")
		return ctx.Status(200).JSON(fiber.Map{"users": collections})
	})

	log.Fatal(app.Listen(":" + PORT))
}
