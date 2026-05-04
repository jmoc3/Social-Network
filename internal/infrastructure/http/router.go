package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jmoc3/Social-Network.git/internal/infrastructure/http/handler"
)

func NewRouter(postHandler *handler.PostHandler, userHandler *handler.UserHandler) *fiber.App {
	app := fiber.New()
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
	users.Post("/", h.Save)
	users.Patch("/:id", h.Update)
}
