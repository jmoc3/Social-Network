package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/jmoc3/Social-Network.git/internal/infrastructure/http/handler"
	"github.com/jmoc3/Social-Network.git/internal/infrastructure/http/middleware"
)

func NewRouter(statisticHandler *handler.StatisticHanlder, userHandler *handler.UserHandler) *fiber.App {
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
	registerStatisticRoutes(api, statisticHandler)

	return app
}

func registerStatisticRoutes(router fiber.Router, h *handler.StatisticHanlder) {
	statistics := router.Group("/statistics")
	statistics.Get("/", h.FindAll)
	statistics.Get("/:id", h.FindOne)
	statistics.Post("/", h.Save)
	statistics.Patch("/:id", h.Update)
	statistics.Delete("/:id", h.Delete)
}

func registerUserRoutes(router fiber.Router, h *handler.UserHandler) {
	users := router.Group("/users")
	users.Get("/", h.FindAll)
	users.Get("/me", middleware.AuthMiddleware, h.Me)
	users.Post("/login", h.Login)
	users.Post("/register", h.Register)
	users.Patch("/:id", h.Update)
}
