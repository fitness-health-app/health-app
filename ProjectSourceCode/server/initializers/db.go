package initializers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/fitness-health-app/health-app/ProjectSourceCode/server/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	dataPath = "initializers/data/"
	DB       *gorm.DB
)

type Food struct {
	FoodId    string    `json:"foodId"`
	Label     string    `json:"label"`
	Nutrients Nutrients `json:"nutrients"`
	Category  string    `json:"category"`
	Image     string    `json:"image"`
}

type Nutrients struct {
	Calories     float64 `json:"ENERC_KCAL"`
	Protein      float64 `json:"PROCNT"`
	Fat          float64 `json:"FAT"`
	Carbohydrate float64 `json:"CHOCDF"`
	Fiber        float64 `json:"FIBTG"`
}

type Measures struct {
	Label  string  `json:"label,omitempty"`
	Weight float64 `json:"weight"`
}

type FoodResponse struct {
	Foods []FoodInfo `json:"hints"`
	Links Links      `json:"_links"`
}

type FoodInfo struct {
	Food     Food       `json:"food,omitempty"`
	Measures []Measures `json:"measures"`
}

type Links struct {
	Next Next `json:"next"`
}

type Next struct {
	Title   string `json:"title"`
	NextUrl string `json:"href"`
}

func ConnectDB(config *Config) {
	var err error
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai", config.DBHost, config.DBUserName, config.DBUserPassword, config.DBName, config.DBPort)

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to the Database")
		return
	}
	fmt.Println("Connected Successfully to the Database")
}

func InsertExercisesData() {
	exercises, err := getExercises()
	if err != nil {
		log.Fatal(err)
		return
	}

	err = DB.Create(&exercises).Error
	if err != nil {
		log.Fatal(err)
	}
}

func InsertNutrientsData(config *Config) {
	path := fmt.Sprintf("?app_id=%s&app_key=%s&nutrition-type=cooking&health=vegetarian", config.FoodApiID, config.FoodApiKey)
	url := config.FoodApiURL + path

	for i := 0; i < 10; i++ {
		foods, nextUrl, hasNext, err := getFoodInfo(url)
		if err != nil {
			log.Fatal(err)
			return
		}

		listFoods := []models.Food{}
		for _, foodInfo := range foods {
			json, err := json.Marshal(foodInfo.Measures)
			if err != nil {
				log.Fatal(err)
				return
			}

			if foodInfo.Food.Image == "" {
				continue
			}

			listFoods = append(listFoods, models.Food{
				ExternalID:   foodInfo.Food.FoodId,
				Name:         foodInfo.Food.Label,
				ImageURL:     foodInfo.Food.Image,
				Measures:     json,
				Calories:     foodInfo.Food.Nutrients.Calories,
				Protein:      foodInfo.Food.Nutrients.Protein,
				Fat:          foodInfo.Food.Nutrients.Fat,
				Carbohydrate: foodInfo.Food.Nutrients.Carbohydrate,
				Fiber:        foodInfo.Food.Nutrients.Fiber,
			})
		}

		url = nextUrl
		if len(listFoods) <= 0 {
			continue
		}

		err = DB.Create(&listFoods).Error
		if err != nil {
			log.Fatal(err)
			return
		}

		log.Println("Loading inserting food...")

		time.Sleep(time.Second * 2)

		if !hasNext {
			break
		}
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

func getFoodInfo(url string) ([]FoodInfo, string, bool, error) {
	res, err := http.DefaultClient.Get(url)
	if err != nil {
		return nil, "", false, err
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, "", false, err
	}

	var result FoodResponse
	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, "", false, err
	}

	return result.Foods, result.Links.Next.NextUrl, strings.EqualFold(result.Links.Next.Title, "Next page"), nil
}

func getDataFromFile(file string) ([]byte, error) {
	jsonFile, err := os.Open(dataPath + file)
	if err != nil {
		return nil, err
	}

	defer jsonFile.Close()

	return ioutil.ReadAll(jsonFile)
}
