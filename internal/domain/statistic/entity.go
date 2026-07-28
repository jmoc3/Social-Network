package statistic

type Statistic struct {
	UserId int    `json:"user_id" bson:"user_id"`
	Wpm    int    `json:"wpm" bson:"wpm"`
	Cpm    int    `json:"cpm" bson:"cpm"`
	Time   string `json:"time" bson:"time"`
}

func NewStatistic(userId int, wpm int, cpm int, time string) *Statistic {
	return &Statistic{
		UserId: userId,
		Wpm:    wpm,
		Cpm:    cpm,
		Time:   time,
	}
}
