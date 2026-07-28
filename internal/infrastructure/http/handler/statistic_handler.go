package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jmoc3/Social-Network.git/internal/domain/statistic"
)

type StatisticHanlder struct {
	service *statistic.Service
}

func NewStatisticHandler(service *statistic.Service) *StatisticHanlder {
	return &StatisticHanlder{
		service: service,
	}
}

func (h *StatisticHanlder) FindOne(c *fiber.Ctx) error {
	ctx := c.Context()
	id := c.Params("id")

	statistic, err := h.service.FindOne(ctx, id)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"statistic": statistic})
}

func (h *StatisticHanlder) FindAll(c *fiber.Ctx) error {
	ctx := c.Context()

	statistics, err := h.service.FindAll(ctx)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"statistics": statistics})
}

func (h *StatisticHanlder) Save(c *fiber.Ctx) error {
	ctx := c.Context()

	var statistic statistic.Statistic
	if err := c.BodyParser(&statistic); err != nil {
		return nil
	}

	insertedId, err := h.service.Save(ctx, &statistic)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"insertedId": insertedId})
}

func (h *StatisticHanlder) Update(c *fiber.Ctx) error {
	ctx := c.Context()
	id := c.Params("id")
	var statistic *statistic.Statistic
	if err := c.BodyParser(&statistic); err != nil {
		return nil
	}

	updatedId, err := h.service.Update(ctx, id, statistic)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"updatedId": updatedId})
}

func (h *StatisticHanlder) Delete(c *fiber.Ctx) error {
	ctx := c.Context()
	id := c.Params("id")

	err := h.service.Delete(ctx, id)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"deletedId": id})
}
