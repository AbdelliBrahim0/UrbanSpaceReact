import React from "react";
import { CartProvider } from "./contexts/CartContext";
import { DialogProvider } from "./contexts/DialogContext";
import Routes from "./Routes";
import FloatingContactButtons from "./components/FloatingContactButtons";

function App() {
  return (
    <DialogProvider>
      <CartProvider>
        <Routes />
        <FloatingContactButtons />
      </CartProvider>
    </DialogProvider>
  );
}

export default App;
