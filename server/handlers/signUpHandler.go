package handlers

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/ArtemKarapetian/react/server/structs"
	_ "github.com/mattn/go-sqlite3"
)

func SignUpHandler(w http.ResponseWriter, r *http.Request) {
	var data structs.UserData
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if data.Name == "" || data.Password == "" {
		err := errors.New("Поле(я) пустые")
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	db, err := sql.Open("sqlite3", "../database.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	var lastUserID int = 0
	err = db.QueryRow("SELECT ID FROM users ORDER BY ID DESC LIMIT 1").Scan(&lastUserID)
	if err != nil && err != sql.ErrNoRows {
		fmt.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var existingUserID int
	err = db.QueryRow("SELECT ID FROM users WHERE name = ?", data.Name).Scan(&existingUserID)
	if err != nil && err != sql.ErrNoRows {
		fmt.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if existingUserID > 0 {
		http.Error(w, "Аккаунт с таким именем уже существует", http.StatusBadRequest)
		return
	}

	newUserID := 1
	if lastUserID > 0 {
		newUserID = lastUserID + 1
	}
	_, err = db.Exec("INSERT INTO users (ID, name, password) VALUES (?, ?, ?)", newUserID, data.Name, data.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Регистрация успешна"))
}
