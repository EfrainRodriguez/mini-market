import { GiShoppingCart } from "react-icons/gi";
import { RiCloseFill } from "react-icons/ri";

import "./styles.css";

interface CartButtonProps {
  price?: number;
  isActive?: boolean;
  onClick?: () => void;
  onClose?: () => void;
}

const CartButton = ({
  price = 0,
  isActive = false,
  onClick = () => null,
  onClose = () => null,
}: CartButtonProps) => {
  return (
    <div className="cart-button-container">
      <button
        className={`cart-button ${isActive ? "clicked" : ""}`}
        onClick={onClick}
      >
        <GiShoppingCart />${" "}
        {price.toLocaleString("es", { minimumFractionDigits: 2 })}
      </button>
      {isActive && (
        <button className="cart-button-close" onClick={onClose}>
          <RiCloseFill />
        </button>
      )}
    </div>
  );
};

export default CartButton;
