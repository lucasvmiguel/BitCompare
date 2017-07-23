import React from 'react';

const ProductDetail = ({product}) => (
  <div className="col-xs-12">
    <div className="margin-0-5 card">
      <h3 className="center padding-0-5 white bg-color-dark-blue">Produto</h3>
      <div className="padding-1">
        <div>
          <img className="width-100" src={product.image}/>
        </div>
        <div className="padding-bottom-1">
          <h3 className="product-card-title">{product.name}</h3>
        </div>
        <div className="row">
          <div className="col-xs-6">R$ {product.price}</div>
          <div className="col-xs-6 align-right">{product.rate}/5</div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductDetail;