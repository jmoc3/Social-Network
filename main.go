package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	fmt.Println("Hello world")
	app := fiber.New()
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env")
	}

	PORT := os.Getenv("PORT")

	app.Get("/users", func(ctx *fiber.Ctx) error {
		return ctx.Status(200).JSON(fiber.Map{"msg": "Hello world"})
	})

	log.Fatal(app.Listen(":" + PORT))
}
