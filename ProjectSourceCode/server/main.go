package main

import (
	"log"
	"net/http"

	"github.com/fitness-health-app/health-app/ProjectSourceCode/server/controllers"
	"github.com/fitness-health-app/health-app/ProjectSourceCode/server/initializers"
	"github.com/fitness-health-app/health-app/ProjectSourceCode/server/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var (
	server              *gin.Engine
	AuthController      controllers.AuthController
	AuthRouteController routes.AuthRouteController

	UserController      controllers.UserController
	UserRouteController routes.UserRouteController

	FoodController      controllers.FoodController
	FoodRouteController routes.FoodRouteController

	ExerciseController      controllers.ExerciseController
	ExerciseRouteController routes.ExerciseRouteController
)

func init() {
	config, err := initializers.LoadConfig(".")
	if err != nil {
		log.Fatal("Could not load environment variables", err)
	}

	initializers.ConnectDB(&config)

	AuthController = controllers.NewAuthController(initializers.DB)
	AuthRouteController = routes.NewAuthRouteController(AuthController)

	UserController = controllers.NewUserController(initializers.DB)
	UserRouteController = routes.NewRouteUserController(UserController)

	FoodController = controllers.NewFoodController(initializers.DB)
	FoodRouteController = routes.NewFoodRouteController(FoodController)

	ExerciseController = controllers.NewExerciseController(initializers.DB)
	ExerciseRouteController = routes.NewExerciseRouteController(ExerciseController)

	server = gin.Default()
}

func main() {
	config, err := initializers.LoadConfig(".")
	if err != nil {
		log.Fatal("Could not load environment variables", err)
	}

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:8000", config.ClientOrigin}
	corsConfig.AllowCredentials = true

	server.Use(cors.New(corsConfig))

	router := server.Group("/api")
	router.GET("/healthchecker", func(ctx *gin.Context) {
		message := "Health App Backend is Running"
		ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": message})
	})

	AuthRouteController.AuthRoute(router)
	UserRouteController.UserRoute(router)
	FoodRouteController.FoodRoute(router)
	ExerciseRouteController.ExerciseRoute(router)
	log.Fatal(server.Run(":" + config.ServerPort))
}
