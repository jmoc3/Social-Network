package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jmoc3/Social-Network.git/internal/domain/post"
	"github.com/jmoc3/Social-Network.git/internal/domain/user"
	"github.com/jmoc3/Social-Network.git/internal/infrastructure/database"
	"github.com/jmoc3/Social-Network.git/internal/infrastructure/http"
	"github.com/jmoc3/Social-Network.git/internal/infrastructure/http/handler"
	"github.com/jmoc3/Social-Network.git/internal/infrastructure/persistence/mongo"
	"github.com/jmoc3/Social-Network.git/internal/infrastructure/persistence/postgres"
	"github.com/joho/godotenv"
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
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env")
	}

	PORT := os.Getenv("PORT")
	MONGO_URI := os.Getenv("MONGO_URI")
	mongo_client := database.NewMongoConnection(MONGO_URI, "social_network")
	defer mongo_client.Client.Disconnect(context.Background())

	POSTGRES_URI := os.Getenv("POSTGRES_URI")
	postgres_cli := database.NewPostgressConnection(POSTGRES_URI)
	defer postgres_cli.Conn.Close(context.Background())

	postRepo := mongo.NewPostRepository(mongo_client)
	postService := post.NewService(postRepo)
	postHandler := handler.NewPostHandler(postService)

	userRepo := postgres.NewUserRepository(postgres_cli)
	userService := user.NewService(userRepo)
	userHandler := handler.NewUserHandler(userService)

	app := http.NewRouter(postHandler, userHandler)
	log.Fatal(app.Listen(":" + PORT))
}
