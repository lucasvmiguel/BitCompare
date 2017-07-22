import React from 'react';

const ProductCard = ({name, image, rate, price}) => (
  <div>
    <div className="row">
      <img src={image}/>
    </div>
    <div className="row">
      <div className="col-xs">{name}</div>
    </div>
    <div className="row">
      <div className="col-xs">{price}</div>
      <div className="col-xs">{rate}</div>
    </div>
  </div>
);

export default ProductCard;