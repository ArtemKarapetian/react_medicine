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

func LoginHandler(w http.ResponseWriter, r *http.Request) {
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
		http.Error(w, "Ошибка подключения к базе данных", http.StatusInternalServerError)
		log.Fatal(err)
	}
	defer db.Close()

	var existingUserID int
	err = db.QueryRow("SELECT ID FROM users WHERE name = ? AND password = ?", data.Name, data.Password).Scan(&existingUserID)
	if err != nil && err != sql.ErrNoRows {
		fmt.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if existingUserID == 0 {
		http.Error(w, "Неверное имя пользователя или пароль", http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Вход выполнен успешно"))
}