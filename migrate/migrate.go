package main

import (
	"fmt"
	"log"

	"github.com/fitness-health-app/health-app-backend/initializers"
	"github.com/fitness-health-app/health-app-backend/models"
)

func init() {
	config, err := initializers.LoadConfig(".")
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
	fmt.Println("Migration complete")
}
