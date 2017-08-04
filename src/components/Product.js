import React from 'react';
import R from 'ramda';

import Menu from './Menu';
import ProductAttributes from './ProductAttributes';
import ProductOffers from './ProductOffers';
import ProductDetail from './ProductDetail';

const Product = ({loading, product, login, logout}) => {
  return (
    <div>
      <Menu login={login} logout={logout}/>
      <div className="padding-top-3">
        {loading && <p className="center padding-1"> Carregando... </p>}
        {!loading && (
          <div className="row margin-right-0-imp">
            <div className="col-md-6 col-xs-12">
              <div className="row">
                {product && product && <ProductDetail product={product}/>}
              </div>
              <div className="row">
                {product && product.offers && <ProductOffers id={product.id} offers={product.offers}/>}
              </div>
            </div>
            <div className="col-md-6 col-xs-12">
              {R.path(['attributes', 0, 'properties'], product) && <ProductAttributes attributes={product.attributes[0].properties}/>}
              {!R.path(['attributes', 0, 'properties'], product) && <p className="center padding-1">Não tem informações técnicas sobre o produto!</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;

