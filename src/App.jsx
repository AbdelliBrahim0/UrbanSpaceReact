import React from "react";
import { CartProvider } from "./contexts/CartContext";
import Routes from "./Routes";

function App() {
  return (
    <CartProvider>
      <Routes />
    </CartProvider>
  );
}

export default App;
