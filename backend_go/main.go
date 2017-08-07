package main

import (
	"api/product"
	"api/user"

	mgo "gopkg.in/mgo.v2"

	"os"

	"fmt"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	if os.Getenv("brand_1") == "" {
		fmt.Println("need env vars")
		os.Exit(1)
	}

	session, err := mgo.Dial("localhost:27017/bit-compare")
	if err != nil {
		panic(err)
	}
	defer session.Close()

	userColl := session.DB("bit-compare").C("user")
	sessionColl := session.DB("bit-compare").C("session")

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.PUT, echo.POST, echo.DELETE},
	}))

	// USER
	e.POST("/user", user.CreateUserHandler(userColl, sessionColl))
	e.GET("/user/:id", user.GetUserHandler(userColl, sessionColl))
	e.PUT("/user/:id", user.EditUserHandler(userColl, sessionColl))
	e.GET("/user/:idUser/product", user.GetUserProductsHandler(userColl, sessionColl))
	e.POST("/user/:idUser/product/:idProduct", user.CreateProductUserHandler(userColl, sessionColl))
	e.DELETE("/user/:idUser/product/:idProduct", user.DeleteProductUserHandler(userColl, sessionColl))

	// AUTH
	e.POST("/login", user.LoginHandler(userColl, sessionColl))
	e.POST("/logout/:id", user.LogoutHandler(sessionColl))

	// PRODUCT
	e.GET("/product", product.GetProductsHandler())
	e.GET("/product/:id", product.GetProductHandler())

	e.Logger.Fatal(e.Start(":8080"))
}
