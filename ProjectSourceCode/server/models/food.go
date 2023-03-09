package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
)

type Food struct {
	ID           uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	ExternalID   string    `gorm:"unique;index"`
	CreatedAt    time.Time `gorm:"not null"`
	UpdatedAt    time.Time `gorm:"not null"`
	Name         string    `gorm:"type:varchar(255);not null;indexç"`
	ImageURL     string
	Calories     float64
	Protein      float64
	Fat          float64
	Carbohydrate float64
	Fiber        float64
	Measures     datatypes.JSON
}
