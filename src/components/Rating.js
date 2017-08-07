import React from 'react';

const Rating = ({rate}) => {
  if (rate > 5 || rate <= 0) return null;
   
  return (
    <div className="rating">
      {rate && rate >= 1 && <span>&#9733;</span>}
      {rate && rate >= 2 && <span>&#9733;</span>}
      {rate && rate >= 3 && <span>&#9733;</span>}
      {rate && rate >= 4 && <span>&#9733;</span>}
      {rate && rate >= 5 && <span>&#9733;</span>}
    </div>
  );
};

export default Rating;

