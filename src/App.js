import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import MainRouter from "./MainRouter";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>


        <MainRouter />
      </BrowserRouter>
    </CartProvider>


  );
}

export default App;
