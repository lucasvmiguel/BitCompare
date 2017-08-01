import React from 'react';
import {Link} from 'react-router-dom';

const ProductCard = ({id, name, image, rate, price, isFavorite}) => (
  <div className="col-xs-12 col-sm-6 col-md-3">
    <div className="padding-0-5 margin-0-5 search-card card">
      {!isFavorite && <a className="product-card-favorite bg-color-dark-blue white cursor-pointer">+</a>}
      {isFavorite && <a className="product-card-favorite bg-color-light-blue dark-blue cursor-pointer">+</a>}
      <div>
        <Link to={'/produto/' + id}>
          <img className="width-100 search-card-img" src={image} alt="product"/>
        </Link>
      </div>
      <div className="padding-bottom-1">
        <Link to={'/produto/' + id}>
          <h3 className="product-card-title-card">{name}</h3>
        </Link>
      </div>
      <div className="row">
        <div className="col-xs-6">R$ {price}</div>
        {rate !== 0 && <div className="col-xs-6 align-right">{rate.toFixed(1)}/5</div>}
      </div>
    </div>
  </div>
);

export default ProductCard;