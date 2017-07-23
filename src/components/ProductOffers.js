import React from 'react';

const ProductOffers = ({offers}) => (
  <div className="col-xs-12">
    <div className="margin-0-5 card">
      <h3 className="center padding-0-5 bg-color-dark-blue white">Ofertas</h3>
      {offers && offers.map((o) => 
        <div>
          <div className="row">
            <div className="col-xs-4 padding-0-5 center">
              <p>{o.name}</p>
              <p>({o.brand})</p>
            </div>
            <div className="col-xs-4 padding-0-5 center padding-top-1">{o.price}</div>
            <div className="col-xs-4 padding-0-5 center padding-top-1">
              <a href="">
                Ver oferta
              </a>
            </div>
          </div>
          <hr/>
        </div>
        )}
    </div>
  </div>
);

export default ProductOffers;