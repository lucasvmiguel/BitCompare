import React from 'react';
import R from 'ramda';

import Menu from './Menu';
import ProductCard from './ProductCard';

const Search = ({loading, searchTerm, products, login, logout, idUser}) => {
  let productsComp = [];

  if (products) {
    for (let i = 0; i < products.length; i=i+4) {
      productsComp.push(
        <div className="row width-100">
          {products[i] && <ProductCard key={products[i].id} id={products[i].id} name={products[i].name} image={R.path(['images', 0, 'big'], products[i])} price={R.path(['offers', 0, 'salesPrice'], products[i])} rate={products[i].rating.average}/>}
          {products[i+1] && <ProductCard key={products[i+1].id} id={products[i+1].id} name={products[i+1].name} image={R.path(['images', 0, 'big'], products[i+1])} price={R.path(['offers', 0, 'salesPrice'], products[i+1])} rate={products[i+1].rating.average}/>}
          {products[i+2] && <ProductCard key={products[i+2].id} id={products[i+2].id} name={products[i+2].name} image={R.path(['images', 0, 'big'], products[i+2])} price={R.path(['offers', 0, 'salesPrice'], products[i+2])} rate={products[i+2].rating.average}/>}
          {products[i+3] && <ProductCard key={products[i+3].id} id={products[i+3].id} name={products[i+3].name} image={R.path(['images', 0, 'big'], products[i+3])} price={R.path(['offers', 0, 'salesPrice'], products[i+3])} rate={products[i+3].rating.average}/>}
        </div>
      );
    }
  }

  return (
    <div>
      <Menu login={login} logout={logout} idUser={idUser}/>
      <div className="padding-top-3">
        {loading && <p className="center padding-1"> Carregando... </p>}
        {!loading && products && <p className="center padding-1">Encontramos {products.length} produto(s) para o termo <strong>{searchTerm}</strong></p>}
        {! loading && productsComp}
      </div>
    </div>
  );
};

export default Search;