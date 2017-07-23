import React from 'react';
import {Link} from 'react-router-dom';

const ProductCard = ({id, name, image, rate, price}) => (
  <div className="col-xs-12 col-sm-6 col-md-4">
    <div className="padding-0-5 margin-0-5 card">
      <div>
        <Link to={'/produto/' + id}>
          <img className="width-100" src={image}/>
        </Link>
      </div>
      <div className="padding-bottom-1">
        <Link to={'/produto/' + id}>
          <h3 className="product-card-title">{name}</h3>
        </Link>
      </div>
      <div className="row">
        <div className="col-xs-6">R$ {price}</div>
        <div className="col-xs-6 align-right">{rate}/5</div>
      </div>
    </div>
  </div>
);

export default ProductCard;