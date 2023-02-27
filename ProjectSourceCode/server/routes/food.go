package routes

import (
	"github.com/fitness-health-app/health-app/ProjectSourceCode/server/controllers"
	"github.com/fitness-health-app/health-app/ProjectSourceCode/server/middleware"
	"github.com/gin-gonic/gin"
)

type FoodRouteController struct {
	foodController controllers.FoodController
}

func NewFoodRouteController(foodController controllers.FoodController) FoodRouteController {
	return FoodRouteController{foodController}
}

func (rc *FoodRouteController) FoodRoute(rg *gin.RouterGroup) {
	router := rg.Group("/food")

	router.GET("/list", middleware.DeserializeUser(), rc.foodController.GetListFood)
}
