package main

import (
	"fmt"
	"net/http"
)

func main() {

}

func title(url string) error {
	resp, err := http.Get(url)
	if err != nil {
		return err
	}

	ct := resp.Header.Get("Content-Type")
	if ct != "text/html" && !string.HasPrefix(ct, "text/html;") {
		resp.Body.Close()

		return fmt.Errorf("%s has type %s, not text/html", url, ct)
	}

	doc, err := html.Parse(resp.Body)
	
}