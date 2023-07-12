import { useCustomDispatch, useCustomSelector } from "../../hooks/redux";
import { setSelectedProduct, setCartItems } from "../../redux/slices/cart.slice";
import CartButton from "../CartButton";
import shopIcon from "../../assets/shop-icon.svg";
import { getTotal } from "../../utils/cart.utils";

import "./styles.css";

const ShoppingHeader = () => {
  const { cartItems, selectedProduct } = useCustomSelector(
    (state) => state.cart
  );

  const dispatch = useCustomDispatch();

  const handleShowCart = () => {
    dispatch(setSelectedProduct(null));
  };

  const handleCleanCart = () => {
    confirm("Are you sure you want to clean the cart?") &&
      dispatch(setCartItems([])) &&
      dispatch(setSelectedProduct(null));
  };

  return (
    <div className="header-container">
      <div className="header-icon-box">
        <img src={shopIcon} alt="shopping-bag" className="header-icon" />
      </div>
      <CartButton
        isActive={!selectedProduct && cartItems.length > 0}
        price={getTotal(cartItems)}
        onClick={handleShowCart}
        onClose={handleCleanCart}
      />
    </div>
  );
};

export default ShoppingHeader;
