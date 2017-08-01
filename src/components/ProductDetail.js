import React from 'react';
import R from 'ramda';

const ProductDetail = ({product}) => (
  <div className="col-xs-12">
    <div className="margin-0-5 card">
      <h3 className="center padding-0-5 white bg-color-dark-blue">Produto</h3>
      <div className="padding-1">
        <div className="center">
          {!product.isFavorite && <a className="product-card-favorite bg-color-dark-blue white cursor-pointer">+</a>}
          {product.isFavorite && <a className="product-card-favorite bg-color-light-blue dark-blue cursor-pointer">+</a>}
          <img className="product-detail-img" src={R.path(['images', 0, 'big'], product)} alt="product"/>
        </div>
        <div className="padding-bottom-1 padding-top-1">
          <h3 className="product-card-title">{product.name}</h3>
        </div>
        <div className="row">
          <div className="col-xs-6">R$ {R.path(['offers', 0, 'salesPrice'], product)}</div>
          {product.rating !== 0 && <div className="col-xs-6 align-right">{product.rating.toFixed(1)}/5</div>}
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetail;