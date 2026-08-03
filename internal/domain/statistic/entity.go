package statistic

import "time"

type Statistic struct {
	UserId    string    `json:"user_id" bson:"user_id"`
	Wpm       float32   `json:"wpm" bson:"wpm"`
	Cpm       float32   `json:"cpm" bson:"cpm"`
	Time      string    `json:"time" bson:"time"`
	UpdatedAt time.Time `json:"updated_at" bson:"updated_at"`
	CreatedAt time.Time `json:"created_at" bson:"created_at"`
}

func NewStatistic(userId string, wpm float32, cpm float32, time string) *Statistic {
	return &Statistic{
		UserId: userId,
		Wpm:    wpm,
		Cpm:    cpm,
		Time:   time,
	}
}
