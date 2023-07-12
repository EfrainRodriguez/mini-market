import { useEffect } from "react";

import type { Product } from "../../models/product.model";
import { useCustomSelector, useCustomDispatch } from "../../hooks/redux";
import { setSelectedProduct } from "../../redux/slices/cart.slice";
import Chip from "../Chip";
import { getTotal } from "../../utils/cart.utils";

import "./styles.css";

const PAYMENT_URL = "https://checkout.wompi.co/widget.js";
const PAYMENT_PUBLIC_KEY = "pub_test_Q5yDA9xoKdePzhSGeVe9HAez7HgGORGf";
const PAYMENT_CURRENCY = "COP";
const PAYMENT_REFERENCE = "4XMPGKWWPKWQ";
const PAYMENT_SIGNATURE_INTEGRITY =
  "37c8407747e595535433ef8f6a811d853cd943046624a0ec04662b17bbf33bf5";

const ShoppingCart = () => {
  const { cartItems } = useCustomSelector((state) => state.cart);

  const dispatch = useCustomDispatch();

  const handleClick = (product: Product) => {
    dispatch(setSelectedProduct(product));
  };

  useEffect(() => {
    const total = getTotal(cartItems) * 100;

    const script = document.createElement("script");
    script.src = PAYMENT_URL;
    script.setAttribute("data-render", "button");
    script.setAttribute("data-public-key", PAYMENT_PUBLIC_KEY);
    script.setAttribute("data-currency", PAYMENT_CURRENCY);
    script.setAttribute("data-amount-in-cents", total.toString());
    script.setAttribute("data-reference", PAYMENT_REFERENCE);
    script.setAttribute(
      "data-signature:integrity",
      PAYMENT_SIGNATURE_INTEGRITY
    );

    document.querySelector("form")?.appendChild(script);

    return () => {
      document.querySelector("form")?.removeChild(script);
    };
  }, [cartItems]);

  return (
    <div className="shopping-cart">
      <h3 className="subtitle">Shopping Cart</h3>
      <div className="divider" />
      <div className="shopping-cart-list">
        {cartItems?.map((item, index) => (
          <div
            key={index}
            className="shopping-cart-item-wrapper"
            onClick={() => handleClick(item)}
          >
            <div className="shopping-cart-item">
              <Chip label={item.quantity} className="shopping-cart-item-chip" />
              <div className="shopping-cart-item-img">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="shopping-cart-item-info">
                <p className="shopping-cart-item-name">{item.title}</p>{" "}
                <div>
                  <p className="shopping-cart-item-price">
                    $ {item.price.toLocaleString()}
                  </p>
                  <p className="shopping-cart-item-price total">
                    $ {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="divider" />
          </div>
        ))}
      </div>
      <div className="shopping-cart-total">
        <span className="shopping-cart-total-label">Total:</span>
        <span className="shopping-cart-total-price">
          $ {getTotal(cartItems)?.toLocaleString()}
        </span>
      </div>
      <form></form>
    </div>
  );
};

export default ShoppingCart;
