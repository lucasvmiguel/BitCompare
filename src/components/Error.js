import React from 'react';

const Product = ({error}) => {
  if (!error) return null;

  let message = '';

  switch (error.message) {
    case '400':
      message = 'Preencha os campos corretamente!';
      break;
    case '401':
      message = 'E-mail e/ou senha incorretos!';
      break;
    case '500':
      message = 'Erro interno do servidor!';
      break;
    default:
      message = error.message;
  }


  return (
    <div className="center">
      <span className="error-message">
        {message}
      </span>
    </div>
  );
};

export default Product;

