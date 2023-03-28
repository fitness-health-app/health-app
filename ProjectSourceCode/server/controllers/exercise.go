package controllers

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/fitness-health-app/health-app/ProjectSourceCode/server/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type ExerciseController struct {
	DB *gorm.DB
}

var (
	targets = []string{
		"abductors",
		"abs",
		"adductors",
		"biceps",
		"calves",
		"cardiovascular system",
		"delts",
		"forearms",
		"glutes",
		"hamstrings",
		"lats",
		"levator scapulae",
		"pectorals",
		"quads",
		"serratus anterior",
		"spine",
		"traps",
		"triceps",
		"upper back",
	}

	bodyParts = []string{
		"back",
		"cardio",
		"chest",
		"lower arms",
		"lower legs",
		"neck",
		"shoulders",
		"upper arms",
		"upper legs",
		"waist",
	}
)

func NewExerciseController(DB *gorm.DB) ExerciseController {
	return ExerciseController{DB}
}

func isValid(str string, list []string) bool {
	for idx := range list {
		if list[idx] == str {
			return true
		}
	}

	return false
}
func (fc *ExerciseController) GetListExercise(ctx *gin.Context) {
	limit := 10
	limitStr := ctx.Query("limit")
	if limitStr != "" {
		if limitRes, err := strconv.Atoi(limitStr); err == nil {
			limit = limitRes
		}
	}

	searchStr := ctx.Query("search")

	query := "lower(name) LIKE lower('%" + searchStr + "%') "

	targetStr := ctx.Query("target")
	if targetStr != "" {
		if !isValid(targetStr, targets) {
			ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": targetStr + " - target param does not exists. Here are the valids: " + strings.Join(targets, ", ")})
			return
		}

		query += fmt.Sprintf("AND target = '%s' ", targetStr)
	}

	bodyPartStr := ctx.Query("bodyPart")
	if bodyPartStr != "" {
		if !isValid(bodyPartStr, bodyParts) {
			ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": bodyPartStr + " - bodyPart param does not exists. Here are the valids: " + strings.Join(bodyParts, ", ")})
			return
		}

		query += fmt.Sprintf("AND body_part = '%s' ", bodyPartStr)
	}

	var Exercises []models.Exercise
	err := fc.DB.
		Limit(limit).
		Where(query).
		Find(&Exercises).
		Error
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": Exercises})
}
