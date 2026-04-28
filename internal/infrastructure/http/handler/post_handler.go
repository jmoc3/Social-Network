package handler

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/jmoc3/Social-Network.git/internal/domain/post"
)

type PostHandler struct {
	service *post.Service
}

func NewPostHandler(service *post.Service) *PostHandler {
	return &PostHandler{
		service: service,
	}
}

func (h *PostHandler) FindOne(c *fiber.Ctx) error {
	ctx := c.Context()
	id := c.Params("id")
	post, err := h.service.FindOne(ctx, id)

	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"post": post})
}

func (h *PostHandler) FindAll(c *fiber.Ctx) error {
	ctx := c.Context()
	posts, err := h.service.FindAll(ctx)
	fmt.Println(err, posts)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"posts": posts})
}
