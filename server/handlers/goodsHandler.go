package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/ArtemKarapetian/react/server/structs"
)

func GoodsHandler(w http.ResponseWriter, r *http.Request) {
	pageStr := r.URL.Query().Get("page")
	page, err := strconv.Atoi(pageStr)
	if err != nil {
		http.Error(w, "Неправильный номер страницы", http.StatusBadRequest)
		return
	}

	db, err := sql.Open("sqlite3", "../database.db")
	if err != nil {
		http.Error(w, "Ошибка подключения к базе данных", http.StatusInternalServerError)
		log.Fatal(err)
		return
	}
	defer db.Close()

	offset := (page - 1) * 10
	query := fmt.Sprintf("SELECT * FROM goods LIMIT 10 OFFSET %d", offset)
	rows, err := db.Query(query)
	if err != nil {
		http.Error(w, "Ошибка при извлечении каталога", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var goods []structs.GoodData
	for rows.Next() {
		var good structs.GoodData
		err := rows.Scan(&good.ID, &good.Name, &good.ReleaseDate, &good.Image, &good.Price)
		if err != nil {
			fmt.Println(err.Error())
			http.Error(w, "Не получилось отсканировать", http.StatusInternalServerError)
			return
		}

		goods = append(goods, good)
	}

	jsonData, err := json.Marshal(goods)
	if err != nil {
		http.Error(w, "Ошибка маршалинга каталога", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}
