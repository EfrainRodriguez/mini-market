import { useCustomSelector } from "../../hooks/redux";
import Navbar from "../../components/Navbar";
import ShoppingHeader from "../../components/ShoppingHeader";
import ProductList from "../../components/ProductList";
import ProductDetails from "../../components/ProductDetails";
import ShoppingCart from "../../components/ShoppingCart";
import EmptyCart from "../../components/EmptyCart";

import "./styles.css";

const Home = () => {
  const { selectedProduct, cartItems } = useCustomSelector(
    (state) => state.cart
  );

  return (
    <>
      <Navbar />
      <div className="app-container">
        <ShoppingHeader />
        <div className="app-grid">
          <div className="app-grid-col store-col">
            <ProductList />
          </div>
          <div className="app-grid-col cart-col">
            {!selectedProduct && cartItems.length === 0 && <EmptyCart />}
            {selectedProduct && <ProductDetails />}
            {!selectedProduct && cartItems.length > 0 && (
              <ShoppingCart />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
