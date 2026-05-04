package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jmoc3/Social-Network.git/internal/domain/user"
)

type UserHandler struct {
	service *user.Service
}

func NewUserHandler(service *user.Service) *UserHandler {
	return &UserHandler{
		service: service,
	}
}

func (h *UserHandler) FindOne(c *fiber.Ctx) error {
	ctx := c.Context()
	id := c.Params("id")

	user, err := h.service.FindOne(ctx, id)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"user": user})
}

func (h *UserHandler) FindAll(c *fiber.Ctx) error {
	ctx := c.Context()
	users, err := h.service.FindAll(ctx)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"users": users})
}

func (h *UserHandler) Save(c *fiber.Ctx) error {
	ctx := c.Context()
	var user user.User
	if err := c.BodyParser(&user); err != nil {
		return err
	}

	insertedId, err := h.service.Save(ctx, user)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"insertedId": insertedId})
}

func (h *UserHandler) Update(c *fiber.Ctx) error {
	ctx := c.Context()
	id := c.Params("id")

	var user user.UpdateUserRequest
	if err := c.BodyParser(&user); err != nil {
		return err
	}

	updatedId, err := h.service.Update(ctx, id, user)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"updatedId": updatedId})
}

func (h *UserHandler) Delete(c *fiber.Ctx) error {

	ctx := c.Context()
	id := c.Params("id")

	user, err := h.service.Delete(ctx, id)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"userDeleted": user})
}
