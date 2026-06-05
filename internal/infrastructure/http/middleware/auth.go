package middleware

import (
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

func AuthMiddleware(c *fiber.Ctx) error {
	header := c.Get("Authorization")
	if header == "" {
		return c.Status(401).JSON(fiber.Map{"error": "Token Requerido"})
	}

	parts := strings.Split(header, " ")

	if len(parts) != 2 || parts[0] != "Bearer" {
		return c.Status(401).JSON(fiber.Map{"error": "Token Invalido"})
	}

	c.Locals("token", parts[1])

	claims, err := validarToken(parts[1])
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Token invalido o expirado"})
	}

	c.Locals("claims", claims)
	return c.Next()
}

func GenerateToken(userId string, email string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userId,
		"email":   email,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}

	return jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString(jwtSecret)
}

func validarToken(tokenStr string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Algoritmo invalido")
		}

		return jwtSecret, nil
	})

	if err != nil || !token.Valid {
		return nil, fmt.Errorf("Token invalido")
	}

	claims, ok := token.Claims.(jwt.MapClaims)

	if !ok {
		return nil, fmt.Errorf("claims invalidos")
	}

	return claims, nil
}
