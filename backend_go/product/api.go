package product

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/bradfitz/slice"
)

func transformResponse(responsesAcom *productResponse, responsesSuba *productResponse, responsesShop *productResponse, responsesSoub *productResponse) compareResponse {
	offers := []offer{}

	if responsesAcom != nil {
		for _, offer := range responsesAcom.Offers {
			offer.Brand = os.Getenv("brand_1")
			offers = append(offers, offer)
		}
	}

	if responsesSuba != nil {
		for _, offer := range responsesSuba.Offers {
			offer.Brand = os.Getenv("brand_2")
			offers = append(offers, offer)
		}
	}

	if responsesShop != nil {
		for _, offer := range responsesShop.Offers {
			offer.Brand = os.Getenv("brand_3")
			offers = append(offers, offer)
		}
	}

	if responsesSoub != nil {
		for _, offer := range responsesSoub.Offers {
			offer.Brand = os.Getenv("brand_4")
			offers = append(offers, offer)
		}
	}

	slice.Sort(offers[:], func(i, j int) bool {
		return offers[i].SalesPrice < offers[j].SalesPrice
	})

	return compareResponse{
		ID:         responsesAcom.ID,
		Name:       responsesAcom.Name,
		Attributes: responsesAcom.Attributes,
		Images:     responsesAcom.Images,
		Rating:     responsesAcom.Rating.Average,
		Offers:     offers,
	}
}

func getProduct(brand string, productID string) *productResponse {
	resp, err := http.Get(fmt.Sprintf(os.Getenv("url_product"), brand, productID))
	if err != nil {
		return nil
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return nil
	}

	respBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil
	}

	productResp := &productResponse{}

	err = json.Unmarshal(respBody, productResp)
	if err != nil {
		return nil
	}

	return productResp
}
