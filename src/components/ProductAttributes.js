import React from 'react';

const ProductAttributes = ({attributes}) => (
  <div className="col-xs-12">
    <div className="margin-0-5 card">
      <h3 className="center padding-0-5 white bg-color-dark-blue">Características</h3>
      {attributes && attributes.map((a) => 
        <div>
          <div className="row">
            <div className="col-xs-6 padding-0-5 center">{a.name}</div>
            <div className="col-xs-6 padding-0-5 center">{a.value}</div>
          </div>
          <hr/>
        </div>
        )}
    </div>
  </div>
);

export default ProductAttributes;