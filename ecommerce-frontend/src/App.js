import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleCheckout = () => {
    alert('Compra finalizada com sucesso!');
    setCartItems([]);
  };

  return (
    <Router>
      <nav>
        <Link to="/">Produtos</Link> | <Link to="/cart">Carrinho</Link> | <Link to="/checkout">Checkout</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        <Route path="/checkout" element={<Checkout onCheckout={handleCheckout} />} />
      </Routes>
    </Router>
  );
}

export default App;
