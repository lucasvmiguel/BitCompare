package product

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"sync"

	"os"

	"github.com/labstack/echo"
)

func SearchProductsByContent(content string) ([]*productResponse, error) {
	resp, err := http.Get(fmt.Sprintf(os.Getenv("url_search"), url.QueryEscape(content)))
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	respBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	searchResp := &searchResponse{}
	err = json.Unmarshal(respBody, searchResp)
	if err != nil {
		return nil, err
	}

	var wg sync.WaitGroup
	products := []*productResponse{}

	wg.Add(len(searchResp.Products))

	for index := range searchResp.Products {
		go func(id int) {
			resp, err := http.Get(fmt.Sprintf(os.Getenv("url_product_small"), os.Getenv("brand_1"), id))
			if err != nil {
				wg.Done()
				return
			}
			defer resp.Body.Close()

			respBody, err := ioutil.ReadAll(resp.Body)
			if err != nil {
				wg.Done()
				return
			}

			productResp := &productResponse{}

			err = json.Unmarshal(respBody, productResp)
			if err != nil {
				wg.Done()
				return
			}
			if productResp != nil {
				products = append(products, productResp)
			}
			wg.Done()
		}(searchResp.Products[index].ID)
	}

	wg.Wait()

	return products, nil
}

func GetProductsHandler() func(c echo.Context) error {
	return func(c echo.Context) error {
		contentQS := c.QueryParam("content")
		if contentQS == "" {
			return c.String(http.StatusBadRequest, "request must have content")
		}

		products, err := SearchProductsByContent(contentQS)
		if err != nil {
			return c.String(http.StatusInternalServerError, "internal server error")
		}

		return c.JSON(http.StatusOK, products)
	}
}

func GetProductHandler() func(c echo.Context) error {
	return func(c echo.Context) error {
		productID := c.Param("id")
		if productID == "" {
			return c.String(http.StatusBadRequest, "request must have content")
		}

		var wg sync.WaitGroup

		wg.Add(4)
		var responseAcom *productResponse
		var responseSuba *productResponse
		var responseShop *productResponse
		var responseSoub *productResponse

		go func() {
			responseAcom = getProduct(os.Getenv("brand_1"), productID)
			wg.Done()
		}()

		go func() {
			responseSuba = getProduct(os.Getenv("brand_2"), productID)
			wg.Done()
		}()

		go func() {
			responseShop = getProduct(os.Getenv("brand_3"), productID)
			wg.Done()
		}()

		go func() {
			responseSoub = getProduct(os.Getenv("brand_4"), productID)
			wg.Done()
		}()

		wg.Wait()

		response := transformResponse(responseAcom, responseSuba, responseShop, responseSoub)

		return c.JSON(http.StatusOK, response)
	}
}
