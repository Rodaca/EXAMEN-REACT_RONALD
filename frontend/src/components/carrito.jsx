import React from 'react';
import { useLocation } from 'react-router-dom';

function Carrito() {
  const location = useLocation();
  const producto = location.state.producto;



  return (
    <div>
      <h1>Detalles del Producto {console.log(producto)}</h1>
      {}
    </div>
  );
}

export default Carrito;
