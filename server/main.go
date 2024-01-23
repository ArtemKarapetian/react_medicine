package main

import (
	"log"
	"net/http"
	"github.com/ArtemKarapetian/react/server/handlers"
)

func main() {
	http.HandleFunc("/login", handlers.LoginHandler)
	http.HandleFunc("/signup", handlers.SignUpHandler)
	http.HandleFunc("/goods", handlers.GoodsHandler)
	http.HandleFunc("/createnewdb", handlers.CreateNewDB)

	log.Fatal(http.ListenAndServe(":8000", nil))
}
