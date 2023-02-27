package controllers

import (
	"net/http"
	"strconv"

	"github.com/fitness-health-app/health-app/ProjectSourceCode/server/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type FoodController struct {
	DB *gorm.DB
}

func NewFoodController(DB *gorm.DB) FoodController {
	return FoodController{DB}
}

func (fc *FoodController) GetListFood(ctx *gin.Context) {
	limit := 10
	limitStr := ctx.Query("limit")
	if limitStr != "" {
		if limitRes, err := strconv.Atoi(limitStr); err == nil {
			limit = limitRes
		}
	}

	searchStr := ctx.Query("search")

	var foods []models.Food
	err := fc.DB.
		Limit(limit).
		Where("lower(name) LIKE lower('%" + searchStr + "%')").
		Find(&foods).
		Error
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": foods})
}
