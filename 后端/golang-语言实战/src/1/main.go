package main

import (
	"log"
	"os"

	_"github.com/goinaction/code/chapter2/sample/matchers"
	_ "github.com/goinaction/code/chapter2/sample/search"
)

func init() {
	log.SetOutput(os.Stdout);
}

func main() {
	search.Run("president");
}