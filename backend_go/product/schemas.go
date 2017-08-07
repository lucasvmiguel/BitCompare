package product

type searchResponse struct {
	Result struct {
		Limit  int `json:"limit"`
		Offset int `json:"offset"`
		Total  int `json:"total"`
	} `json:"_result"`
	DidYouMean string `json:"didYouMean"`
	Products   []struct {
		ID     int         `json:"id"`
		Images interface{} `json:"images"`
		Name   string      `json:"name"`
		Rate   int         `json:"rate"`
	} `json:"products"`
	SearchSuggestions interface{} `json:"searchSuggestions"`
	Source            string      `json:"source"`
	Aggregations      []struct {
		Count   int    `json:"count"`
		ID      string `json:"id,omitempty"`
		Options []struct {
			Count int    `json:"count"`
			ID    string `json:"id"`
			Title string `json:"title"`
			Links struct {
				Search struct {
					Aggregation struct {
						ID    string `json:"id"`
						Value string `json:"value"`
					} `json:"aggregation"`
					Href string `json:"href"`
				} `json:"search"`
			} `json:"_links"`
			Aggregated bool   `json:"aggregated"`
			Value      string `json:"value"`
		} `json:"options"`
		Title string `json:"title"`
		Type  string `json:"type"`
		Links struct {
			Search struct {
				Aggregation struct {
					ID    string `json:"id"`
					Value string `json:"value"`
				} `json:"aggregation"`
				Href string `json:"href"`
			} `json:"search"`
		} `json:"_links"`
		Aggregated bool   `json:"aggregated"`
		Value      string `json:"value,omitempty"`
	} `json:"aggregations"`
	SortBy string `json:"sortBy"`
	Timing int    `json:"timing"`
}

type productResponse struct {
	ID                       string      `json:"id"`
	Name                     string      `json:"name"`
	Tags                     []string    `json:"tags"`
	B2BOnly                  bool        `json:"b2bOnly"`
	SellerTypeClassification string      `json:"sellerTypeClassification"`
	Attributes               []attribute `json:"attributes"`
	Offers                   []offer     `json:"offers"`
	Images                   []image     `json:"images"`
	Groups                   []string    `json:"groups"`
	Rating                   struct {
		Reviews         int     `json:"reviews"`
		Recommendations int     `json:"recommendations"`
		Average         float64 `json:"average"`
	} `json:"rating"`
	Links struct {
		Self struct {
			Href string `json:"href"`
		} `json:"self"`
	} `json:"_links"`
}

type compareResponse struct {
	ID         string      `json:"id"`
	Name       string      `json:"name"`
	Images     []image     `json:"images"`
	Offers     []offer     `json:"offers"`
	Attributes []attribute `json:"attributes"`
	Rating     float64     `json:"rating"`
}

type offer struct {
	ID           string `json:"id"`
	Availability struct {
		Stamps   []string `json:"stamps"`
		Embedded struct {
			Stock struct {
				Quantity int `json:"quantity"`
				Links    struct {
					Self struct {
						Href string `json:"href"`
					} `json:"self"`
				} `json:"_links"`
			} `json:"stock"`
		} `json:"_embedded"`
	} `json:"availability"`
	PaymentOptions struct {
	} `json:"paymentOptions"`
	Condition                  string  `json:"condition"`
	MarginClassification       string  `json:"marginClassification,omitempty"`
	SalesPrice                 float64 `json:"salesPrice"`
	IsElegibleForFirstPosition bool    `json:"isElegibleForFirstPosition"`
	Links                      struct {
		Sku struct {
			ID   string `json:"id"`
			Href string `json:"href"`
		} `json:"sku"`
	} `json:"_links"`
	Embedded struct {
		Seller struct {
			ID   string `json:"id"`
			Name string `json:"name"`
		} `json:"seller"`
	} `json:"_embedded"`
	Discount struct {
		Rate  float64 `json:"rate"`
		Value float64 `json:"value"`
	} `json:"discount"`
	Brand string `json:"brand"`
}

type image struct {
	Medium     string `json:"medium,omitempty"`
	Big        string `json:"big,omitempty"`
	Large      string `json:"large"`
	ExtraLarge string `json:"extraLarge"`
}

type attribute struct {
	Title      string `json:"title"`
	Properties []struct {
		Name   string   `json:"name"`
		Value  string   `json:"value"`
		Values []string `json:"values"`
	} `json:"properties"`
}
