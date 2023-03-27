package routes

import (
	"github.com/fitness-health-app/health-app/ProjectSourceCode/server/controllers"
	"github.com/fitness-health-app/health-app/ProjectSourceCode/server/middleware"
	"github.com/gin-gonic/gin"
)

type ExerciseRouteController struct {
	exerciseController controllers.ExerciseController
}

func NewExerciseRouteController(exerciseController controllers.ExerciseController) ExerciseRouteController {
	return ExerciseRouteController{exerciseController}
}

func (rc *ExerciseRouteController) ExerciseRoute(rg *gin.RouterGroup) {
	router := rg.Group("/exercise")

	router.GET("/list", middleware.DeserializeUser(), rc.exerciseController.GetListExercise)
}
