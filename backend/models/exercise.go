package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
)

type Exercise struct {
	ID          uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	CreatedAt   time.Time      `gorm:"not null"`
	UpdatedAt   time.Time      `gorm:"not null"`
	Name        string         `gorm:"type:varchar(255);not null"`
	Description string         `gorm:"type:varchar"`
	Muscle      pq.StringArray `gorm:"type:varchar(64)[]"`
}
