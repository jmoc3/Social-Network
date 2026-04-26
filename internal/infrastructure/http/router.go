package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jmoc3/Social-Network.git/internal/infrastructure/http/handler"
)

func NewRouter(postHandler *handler.PostHandler) *fiber.App {
	app := fiber.New()
	api := app.Group("/api/v1")

	registerPostRoutes(api, postHandler)

	return app
}

func registerPostRoutes(router fiber.Router, h *handler.PostHandler) {
	posts := router.Group("/posts")
	posts.Get("/", h.FindAll)
}
