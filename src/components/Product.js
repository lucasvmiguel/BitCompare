import React from 'react';

import Menu from './Menu';
import ProductAttributes from './ProductAttributes';
import ProductOffers from './ProductOffers';
import ProductDetail from './ProductDetail';

const Product = ({loading, product}) => {
  return (
    <div>
      <Menu />
      <div className="padding-top-3">
        {loading && <p className="center padding-1"> Carregando... </p>}
        {!loading && (
          <div className="row margin-right-0-imp">
            <div className="col-md-6 col-xs-12">
              <div className="row">
                <ProductDetail product={product}/>
              </div>
              <div className="row">
                <ProductOffers offers={product.offers}/>
              </div>
            </div>
            <div className="col-md-6 col-xs-12">
              <ProductAttributes attributes={product.attributes}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;

