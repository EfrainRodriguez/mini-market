import emptyCart from "../../assets/empty-cart.svg";

import "./styles.css";

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <h3 className="subtitle">Start shopping!</h3>
      <div className="divider" />
      <div className="empty-cart-wrapper">
        <img src={emptyCart} alt="Empty cart" />
      </div>
      <p className="empty-cart-text">
        Please choose a product on the left side to start shopping
      </p>
    </div>
  );
};

export default EmptyCart;
