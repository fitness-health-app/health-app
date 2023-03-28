package models

import (
	"time"

	"github.com/google/uuid"
)

type Exercise struct {
	ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	CreatedAt time.Time `gorm:"not null"`
	UpdatedAt time.Time `gorm:"not null"`
	Name      string    `gorm:"type:varchar(255);not null;index"`
	BodyPart  string    `gorm:"type:varchar"`
	Equipment string    `gorm:"type:varchar"`
	ImageURL  string    `gorm:"type:varchar"`
	Target    string    `gorm:"type:varchar"`
}
