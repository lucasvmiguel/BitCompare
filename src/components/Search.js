import React from 'react';

import Menu from './Menu';
import ProductCard from './ProductCard';

const Search = ({loading, searchTerm, products}) => (
  <div>
    <Menu />
    <div className="padding-top-3">
      {loading && <p className="center"> Carregando... </p>}
      {!loading && <p className="center">Encontramos {products.length} produto(s) para o termo {searchTerm}</p>}
      {! loading && products.map((product) => <ProductCard name={product.name} image={product.image} price={product.price} rate={product.rate}/>)}
    </div>
  </div>
);

export default Search;