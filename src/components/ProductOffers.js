import React from 'react';

const ProductOffers = ({id, offers}) => (
  <div className="col-xs-12">
    <div className="margin-0-5 card">
      <h3 className="center padding-0-5 bg-color-dark-blue white">Ofertas</h3>
      {offers && offers.map((o) => 
        <div key={o._embedded.seller.name + '-' + o.brand}>
          <div className="row">
            <div className="col-xs-4 padding-0-5 center">
              <p>{o._embedded.seller.name}</p>
              <p>({o.brand})</p>
            </div>
            <div className="col-xs-4 padding-0-5 center padding-top-1">R$ {o.salesPrice}</div>
            <div className="col-xs-4 padding-0-5 center padding-top-1">
              <a href={`https://${o.brand}.com.br/produto/${id}?sellerId=${o._embedded.seller.id}`} target="_blank" className="bg-color-dark-blue white padding-0-5 cursor-pointer see-offer-btn">
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