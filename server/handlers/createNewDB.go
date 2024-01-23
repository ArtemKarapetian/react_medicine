package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

func CreateNewDB(w http.ResponseWriter, r *http.Request) {
	if err := os.Remove("../database.db"); err != nil && !os.IsNotExist(err) {
		log.Println("Ошибка удаления файла базы данных:", err)
		http.Error(w, "Внутренняя ошибка сервера", http.StatusInternalServerError)
		return
	}

	file, err := os.Create("../database.db")
	if err != nil {
		log.Println("Ошибка создания файла базы данных:", err)
		http.Error(w, "Внутренняя ошибка сервера", http.StatusInternalServerError)
		return
	}
	defer file.Close()

	db, err := sql.Open("sqlite3", "../database.db")
	if err != nil {
		log.Println("Ошибка открытия базы данных:", err)
		http.Error(w, "Внутренняя ошибка сервера", http.StatusInternalServerError)
		return
	}

	_, err = db.Exec("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, password TEXT)")
	if err != nil {
		log.Println("Ошибка создания таблицы users:", err)
		http.Error(w, "Внутренняя ошибка сервера", http.StatusInternalServerError)
		return
	}

	_, err = db.Exec("CREATE TABLE goods (id INTEGER PRIMARY KEY, name TEXT, release_date TEXT, image TEXT, price REAL)")
	if err != nil {
		log.Println("Ошибка создания таблицы goods:", err)
		http.Error(w, "Внутренняя ошибка сервера", http.StatusInternalServerError)
		return
	}

	response := map[string]string{"message": "База данных успешно создана"}
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		log.Println("Ошибка маршалинга JSON:", err)
		http.Error(w, "Внутренняя ошибка сервера", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)

	defer db.Close()
}
