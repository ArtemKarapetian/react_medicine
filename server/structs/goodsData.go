package structs

type GoodData struct {
	ID		  	int	    `json:"id"`
	Name        string  `json:"name"`
	ReleaseDate string  `json:"releaseDate"`
	Image		string  `json:"image"`
	Price       float64 `json:"price"`
}

