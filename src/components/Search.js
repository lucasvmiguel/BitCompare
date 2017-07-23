import React from 'react';

import Menu from './Menu';
import ProductCard from './ProductCard';

const Search = ({loading, searchTerm, products}) => {
  let productsComp = [];

  if (products) {
    for (let i = 0; i < products.length; i=i+3) {
      productsComp.push(
        <div className="row width-100">
          {products[i] && <ProductCard id={products[i].id} name={products[i].name} image={products[i].image} price={products[i].price} rate={products[i].rate}/>}
          {products[i+1] && <ProductCard id={products[i].id} name={products[i+1].name} image={products[i+1].image} price={products[i+1].price} rate={products[i+1].rate}/>}
          {products[i+2] && <ProductCard id={products[i].id} name={products[i+2].name} image={products[i+2].image} price={products[i+2].price} rate={products[i+2].rate}/>}
        </div>
      );
    }
  }

  return (
    <div>
      <Menu />
      <div className="padding-top-3">
        {loading && <p className="center padding-1"> Carregando... </p>}
        {!loading && <p className="center padding-1">Encontramos {products.length} produto(s) para o termo {searchTerm}</p>}
        {! loading && productsComp}
      </div>
    </div>
  );
};

export default Search;