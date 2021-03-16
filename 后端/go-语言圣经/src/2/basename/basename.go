package main

import (
	"fmt"
	"os"
)

func main(){
	for _, dir := range os.Args[0:] {
		result := basename(dir)
		fmt.Println(result)
	}
}

func basename(s string) string {
	for i := len(s) - 1; i >= 0; i-- {
		if s[i] == '\\' || s[i] == '/' {
			s = s[i+1:]
			break
		}
	}

	for i := len(s) - 1; i >= 0; i-- {
		if s[i] == '.' {
			s = s[:i]
			break
		}
	}

	return s
}