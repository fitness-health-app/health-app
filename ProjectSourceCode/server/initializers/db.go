package initializers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"

	"github.com/fitness-health-app/health-app-backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	dataPath = "initializers/data/"
	DB       *gorm.DB
)

func ConnectDB(config *Config) {
	var err error
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai", config.DBHost, config.DBUserName, config.DBUserPassword, config.DBName, config.DBPort)

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to the Database")
	}
	fmt.Println("Connected Successfully to the Database")
}

func InsertExercisesData() {
	exercises, err := getExercises()
	if err != nil {
		log.Fatal(err)
	}

	err = DB.Create(&exercises).Error
	if err != nil {
		log.Fatal(err)
	}
}

func InsertNutrientsData() {
	nutrients, err := getNutrients()
	if err != nil {
		log.Fatal(err)
	}

	err = DB.Create(&nutrients).Error
	if err != nil {
		log.Fatal(err)
	}
}

func getExercises() ([]models.Exercise, error) {
	byteValue, err := getDataFromFile("excercise-data.json")
	if err != nil {
		return nil, err
	}

	var exercises []models.Exercise
	err = json.Unmarshal(byteValue, &exercises)
	if err != nil {
		return nil, err
	}

	return exercises, nil
}

func getNutrients() ([]models.Nutrient, error) {
	byteValue, err := getDataFromFile("nutrient-data.json")
	if err != nil {
		return nil, err
	}

	var nutrients []models.Nutrient
	err = json.Unmarshal(byteValue, &nutrients)
	if err != nil {
		return nil, err
	}

	return nutrients, nil
}

func getDataFromFile(file string) ([]byte, error) {
	jsonFile, err := os.Open(dataPath + file)
	if err != nil {
		return nil, err
	}

	defer jsonFile.Close()

	return ioutil.ReadAll(jsonFile)
}
