package user

import (
	"api/product"
	"net/http"

	"strings"

	"github.com/labstack/echo"
	uuid "github.com/satori/go.uuid"
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type user struct {
	ID          string   `json:"id"`
	Email       string   `json:"email"`
	Name        string   `json:"name"`
	OldPassword string   `json:"oldPassword"`
	Password    string   `json:"password"`
	Products    []string `json:"products"`
}

type session struct {
	IDUser string `json:"idUser"`
	Token  string `json:"token"`
}

type login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func CreateUserHandler(userColl *mgo.Collection, sessionColl *mgo.Collection) func(c echo.Context) error {
	return func(c echo.Context) error {
		user := &user{}

		err := c.Bind(user)
		if err != nil {
			return c.NoContent(http.StatusUnprocessableEntity)
		}

		if user.Name == "" || user.Password == "" || user.Email == "" {
			return c.NoContent(http.StatusBadRequest)
		}

		err = userColl.Find(bson.M{"email": user.Email}).One(nil)
		if err == nil {
			return c.NoContent(http.StatusConflict)
		}

		user.ID = uuid.NewV4().String()
		session := &session{
			IDUser: user.ID,
			Token:  uuid.NewV4().String(),
		}

		err = userColl.Insert(user)
		if err != nil {
			return c.NoContent(http.StatusInternalServerError)
		}

		err = sessionColl.Insert(session)
		if err != nil {
			return c.NoContent(http.StatusInternalServerError)
		}

		return c.JSON(http.StatusCreated, session)
	}
}

func GetUserHandler(userColl *mgo.Collection, sessionColl *mgo.Collection) func(c echo.Context) error {
	return func(c echo.Context) error {
		idUser := c.Param("id")
		token := c.Request().Header.Get("token")

		if idUser == "" || token == "" {
			return c.NoContent(http.StatusBadRequest)
		}

		err := sessionColl.Find(bson.M{"token": token, "iduser": idUser}).One(nil)
		if err != nil {
			return c.NoContent(http.StatusNotFound)
		}

		user := &user{}
		err = userColl.Find(bson.M{"id": idUser}).One(user)
		if err != nil {
			return c.NoContent(http.StatusNotFound)
		}
		user.Password = ""

		return c.JSON(http.StatusOK, user)
	}
}

func EditUserHandler(userColl *mgo.Collection, sessionColl *mgo.Collection) func(c echo.Context) error {
	return func(c echo.Context) error {
		idUser := c.Param("id")
		token := c.Request().Header.Get("token")

		if idUser == "" || token == "" {
			return c.NoContent(http.StatusBadRequest)
		}

		err := sessionColl.Find(bson.M{"token": token, "iduser": idUser}).One(nil)
		if err != nil {
			return c.NoContent(http.StatusNotFound)
		}

		currentUser := &user{}
		err = userColl.Find(bson.M{"id": idUser}).One(currentUser)
		if err != nil {
			return c.NoContent(http.StatusNotFound)
		}

		userEdited := &user{}

		err = c.Bind(userEdited)
		if err != nil {
			return c.NoContent(http.StatusUnprocessableEntity)
		}

		currentUser.Name = userEdited.Name

		if userEdited.Password != "" && userEdited.OldPassword != "" {
			if currentUser.Password == userEdited.OldPassword {
				currentUser.Password = userEdited.Password
			} else {
				return c.NoContent(http.StatusUnauthorized)
			}
		}

		err = userColl.Update(bson.M{"id": idUser}, currentUser)
		if err != nil {
			return c.NoContent(http.StatusInternalServerError)
		}

		return c.JSON(http.StatusOK, currentUser)
	}
}

func CreateProductUserHandler(userColl *mgo.Collection, sessionColl *mgo.Collection) func(c echo.Context) error {
	return func(c echo.Context) error {
		idUser := c.Param("idUser")
		idProduct := c.Param("idProduct")
		token := c.Request().Header.Get("token")

		if idUser == "" || token == "" {
			return c.NoContent(http.StatusBadRequest)
		}

		err := sessionColl.Find(bson.M{"token": token, "iduser": idUser}).One(nil)
		if err != nil {
			return c.NoContent(http.StatusNotFound)
		}

		user := &user{}
		err = userColl.Find(bson.M{"id": idUser}).One(user)
		if err != nil {
			return c.NoContent(http.StatusNotFound)
		}

		for i := range user.Products {
			if user.Products[i] == idProduct {
				return c.JSON(http.StatusOK, user)
			}
		}

		user.Products = append(user.Products, idProduct)
		err = userColl.Update(bson.M{"id": idUser}, user)
		if err != nil {
			return c.NoContent(http.StatusInternalServerError)
		}

		return c.JSON(http.StatusOK, user)
	}
}

func GetUserProductsHandler(userColl *mgo.Collection, sessionColl *mgo.Collection) func(c echo.Context) error {
	return func(c echo.Context) error {
		idUser := c.Param("idUser")
		token := c.Request().Header.Get("token")

		if idUser == "" || token == "" {
			return c.NoContent(http.StatusBadRequest)
		}

		err := sessionColl.Find(bson.M{"token": token, "iduser": idUser}).One(nil)
		if err != nil {
			return c.NoContent(http.StatusNotFound)
		}

		user := &user{}
		err = userColl.Find(bson.M{"id": idUser}).One(user)
		if err != nil {
			return c.NoContent(http.StatusNotFound)
		}

		products, err := product.SearchProductsByContent(strings.Join(user.Products, " "))
		if err != nil {
			return c.String(http.StatusInternalServerError, "internal server error")
		}

		return c.JSON(http.StatusOK, products)
	}
}

func DeleteProductUserHandler(userColl *mgo.Collection, sessionColl *mgo.Collection) func(c echo.Context) error {
	return func(c echo.Context) error {
		idUser := c.Param("idUser")
		idProduct := c.Param("idProduct")
		token := c.Request().Header.Get("token")

		if idUser == "" || token == "" {
			return c.NoContent(http.StatusBadRequest)
		}

		err := sessionColl.Find(bson.M{"token": token, "iduser": idUser}).One(nil)
		if err != nil {
			return c.NoContent(http.StatusNotFound)
		}

		user := &user{}
		err = userColl.Find(bson.M{"id": idUser}).One(user)
		if err != nil {
			return c.NoContent(http.StatusNotFound)
		}

		for i := range user.Products {
			if user.Products[i] == idProduct {
				user.Products = append(user.Products[:i], user.Products[i+1:]...)
				err = userColl.Update(bson.M{"id": idUser}, user)

				if err != nil {
					return c.NoContent(http.StatusInternalServerError)
				}
				return c.JSON(http.StatusOK, user)
			}
		}

		return c.JSON(http.StatusOK, user)
	}
}

func LoginHandler(userColl *mgo.Collection, sessionColl *mgo.Collection) func(c echo.Context) error {
	return func(c echo.Context) error {
		login := &login{}

		err := c.Bind(login)
		if err != nil {
			return c.NoContent(http.StatusUnprocessableEntity)
		}

		if login.Email == "" || login.Password == "" {
			return c.NoContent(http.StatusBadRequest)
		}

		user := &user{}
		err = userColl.Find(bson.M{"email": login.Email, "password": login.Password}).One(user)
		if err != nil {
			return c.NoContent(http.StatusUnauthorized)
		}

		session := &session{
			IDUser: user.ID,
			Token:  uuid.NewV4().String(),
		}

		err = sessionColl.Insert(session)
		if err != nil {
			return c.NoContent(http.StatusInternalServerError)
		}

		return c.JSON(http.StatusCreated, session)
	}
}

func LogoutHandler(sessionColl *mgo.Collection) func(c echo.Context) error {
	return func(c echo.Context) error {
		idUser := c.Param("id")
		token := c.Request().Header.Get("token")

		if idUser == "" || token == "" {
			return c.NoContent(http.StatusBadRequest)
		}

		err := sessionColl.Remove(bson.M{"token": token, "iduser": idUser})
		if err != nil {
			return c.NoContent(http.StatusUnauthorized)
		}

		return c.NoContent(http.StatusOK)
	}
}
