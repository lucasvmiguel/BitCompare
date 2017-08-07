import React from 'react';
import R from 'ramda';

import Rating from './Rating';
import { formatReal } from '../services/format';
import { showSnackbar } from '../services/snackbar';

const ProductDetail = ({product, isFavorite, login, addOrRemoveProductToUser}) => {
  const clickToAddOrRemoveProductToUser = () => {
    if (login) return addOrRemoveProductToUser(product.id);

    showSnackbar('É preciso estar logado para adicionar esse produto à sua lista!');
  };

  const classFavorite = (isFavorite) => {
    let className = 'product-card-favorite white cursor-pointer ';
    if (!isFavorite) return className + 'bg-color-dark-blue';
    return className + 'bg-color-light-blue';
  };
  
  return (
    <div className="col-xs-12">
      <div className="margin-0-5 card">
        <h3 className="center padding-0-5 white bg-color-dark-blue">Produto</h3>
        <div className="padding-1">
          <div className="center">
            <a onClick={clickToAddOrRemoveProductToUser} className={classFavorite(isFavorite)}>+</a>
            <img className="product-detail-img" src={R.path(['images', 0, 'big'], product)} alt="product"/>
          </div>
          <div className="padding-bottom-1 padding-top-1">
            <h3 className="product-card-title">{product.name}</h3>
          </div>
          <div className="row">
            <div className="col-xs-6">R$ {formatReal(R.path(['offers', 0, 'salesPrice'], product))}</div>
            
            <div className="align-right col-xs-6 ">
              <Rating  rate={product.rating}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;