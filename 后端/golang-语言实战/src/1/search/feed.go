package search

import (
	"fmt"
	"encoding/json"
	"os"
)

const dataFile = "../data/data.json"

type Feed struct {
	Name string `json:"site"`
	URI string `json:"link"`
	Type string `json:"type"`
}

func RetrieveFeeds() ([]*Feed, error) {
	file, err := os.Open(dataFile)
	if err != nil {
		return nil, err
	}

	defer file.Close()

	var feeds []*Feed
	err = json.NewDecoder(file).Decode(&feeds)

	return feeds, err
}

for _, feed := range feeds {
	matcher, exists := matchers[feed.Type]
	if !exists {
		matcher = matchers["default"]
	}

	go func(matcher Matcher, feed *Feed){
		Match(matcher, feed, searchTerm, results)
		waitGroup.Done()
	}
}(matcher, feed)

func main() {
	tmp,err := RetrieveFeeds()

	fmt.Println(tmp);
	if err != nil {
		fmt.Println(err);
	}
}