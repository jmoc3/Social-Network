package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/jmoc3/Social-Network.git/internal/infrastructure/http/handler"
)

func NewRouter(postHandler *handler.PostHandler, userHandler *handler.UserHandler) *fiber.App {
	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173",
		AllowMethods:     "GET, POST, PUT, PATCH, DELETE",
		AllowHeaders:     "Origin, Content-Type, Authorization",
		AllowCredentials: true,
	},
	))
	api := app.Group("/api/v1")

	registerUserRoutes(api, userHandler)
	registerPostRoutes(api, postHandler)

	return app
}

func registerPostRoutes(router fiber.Router, h *handler.PostHandler) {
	posts := router.Group("/posts")
	posts.Get("/", h.FindAll)
	posts.Get("/:id", h.FindOne)
	posts.Post("/", h.Save)
	posts.Patch("/:id", h.Update)
}

func registerUserRoutes(router fiber.Router, h *handler.UserHandler) {
	users := router.Group("/users")
	users.Get("/", h.FindAll)
	users.Get("/:id", h.FindOne)
	users.Post("/login", h.Login)
	users.Post("/register", h.Save)
	users.Patch("/:id", h.Update)
}
