package main

import (
	"fmt"
	"log"

	"github.com/fitness-health-app/health-app/ProjectSourceCode/server/initializers"
	"github.com/fitness-health-app/health-app/ProjectSourceCode/server/models"
)

var config initializers.Config

func init() {
	var err error
	config, err = initializers.LoadConfig(".")
	if err != nil {
		log.Fatal("Could not load environment variables", err)
	}

	initializers.ConnectDB(&config)
}

func main() {
	err := initializers.DB.Exec("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"").Error
	if err != nil {
		log.Fatal(err)
	}

	initializers.DB.AutoMigrate(&models.User{})

	initializers.DB.AutoMigrate(&models.Exercise{})
	initializers.InsertExercisesData()

	initializers.DB.Migrator().DropTable(&models.Food{})

	initializers.DB.AutoMigrate(&models.Food{})
	initializers.InsertNutrientsData(&config)

	fmt.Println("Migration complete")
}
