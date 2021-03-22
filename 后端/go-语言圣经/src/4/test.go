package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
	"math/rand"
)

func main() {
	http.HandleFunc("/", handler)
	log.Fatal(http.ListenAndServe("localhost:8000", nil))
}

func handler(w http.ResponseWriter, r *http.Request){
	rnd := rand.New(rand.NewSource(time.Now().UnixNano()))
	code := fmt.Sprintf("#{rnd.Int31n(1000000)}")
	w.Write([]byte(code))
}