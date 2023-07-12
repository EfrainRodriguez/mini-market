import type { CartItem } from "../../models/product.model";
import { useCustomSelector, useCustomDispatch } from "../../hooks/redux";
import { setCartItems } from "../../redux/slices/cart.slice";
import Chip from "../Chip";
import AddRemoveButton from "../AddRemoveButton";

import "./styles.css";

const ProductDetails = () => {
  const { selectedProduct, cartItems } = useCustomSelector(
    (state) => state.cart
  );

  const dispatch = useCustomDispatch();

  const renderQuantityChip = () => {
    const item = cartItems.find((item) => item.id === selectedProduct?.id);
    return <Chip label={item?.quantity || 0} className="product-list-chip" />
  };

  const handleAdd = () => {
    const productIndex = cartItems.findIndex(
      (item) => item.id === selectedProduct?.id
    );

    if (productIndex !== -1) {
      const newCartItems = [...cartItems];
      const product = { ...newCartItems[productIndex] };
      product.quantity += 1;
      newCartItems[productIndex] = product;
      dispatch(setCartItems(newCartItems));
      return;
    }

    const newCartItems = [
      ...cartItems,
      { ...selectedProduct, quantity: 1 } as CartItem,
    ];
    dispatch(setCartItems(newCartItems));
  };

  const handleRemove = () => {
    const productIndex = cartItems.findIndex(
      (item) => item.id === selectedProduct?.id
    );

    if (productIndex !== -1) {
      const newCartItems = [...cartItems];
      const product = { ...newCartItems[productIndex] };
      product.quantity -= 1;
      if (product.quantity === 0) {
        newCartItems.splice(productIndex, 1);
      } else {
        newCartItems[productIndex] = product;
      }
      dispatch(setCartItems(newCartItems));
    }
  };

  return (
    <div className="product-details">
      <h3 className="subtitle">Product</h3>
      <div className="divider" />
      <div className="product-wrapper">
        {renderQuantityChip()}
        <div className="product-img">
          <img src={selectedProduct?.image} alt={selectedProduct?.title} />
        </div>
      </div>
      <div className="product-info">
        <div className="product-title-wrapper">
          <div className="product-title">
            <span className="product-name">{selectedProduct?.title}</span>{" "}
            <div className="dot-separator" />{" "}
            <span className="product-price">
              $ {selectedProduct?.price.toLocaleString()}
            </span>{" "}
          </div>
          <AddRemoveButton onAdd={handleAdd} onRemove={handleRemove} />
        </div>
        <div className="divider" />
        <p className="product-description">
          {selectedProduct?.description || "No description"}
        </p>
        <div className="divider" />
      </div>
    </div>
  );
};

export default ProductDetails;
