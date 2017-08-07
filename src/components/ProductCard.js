import React from 'react';
import {Link} from 'react-router-dom';

import Rating from './Rating';

import { formatReal, formatTextHundred } from '../services/format';
import { showSnackbar } from '../services/snackbar';

const ProductCard = ({id, name, image, rate, price, isFavorite, login, addOrRemoveProductToUser}) => {
  const clickToAddOrRemoveProductToUser = () => {
    if (login) return addOrRemoveProductToUser(id);

    showSnackbar('É preciso estar logado para adicionar esse produto à sua lista!');
  };

  const classFavorite = (isFavorite) => {
    let className = 'product-card-favorite white cursor-pointer ';
    if (!isFavorite) return className + 'bg-color-dark-blue';
    return className + 'bg-color-light-blue';
  };

  return (
    <div className="col-xs-12 col-sm-6 col-md-3">
      <div className="padding-0-5 margin-0-5 search-card card">
        <a onClick={clickToAddOrRemoveProductToUser} className={classFavorite(isFavorite)}>+</a>
        <div>
          <Link to={'/produto/' + id}>
            <img className="width-100 search-card-img" src={image} alt="product"/>
          </Link>
        </div>
        <div className="padding-bottom-1">
          <Link to={'/produto/' + id}>
            <h3 className="product-card-title-card">{formatTextHundred(name)}</h3>
          </Link>
        </div>
        <div className="row">
          <div className="col-xs-6">R$ {formatReal(price)}</div>
          <div className="col-xs-6 align-right">
            <Rating  rate={rate}/>
          </div>
        </div>
      </div>
    </div>);
};

export default ProductCard;