import type { Product } from "../../models/product.model";
import { useCustomDispatch, useCustomSelector } from "../../hooks/redux";
import { setSelectedProduct } from "../../redux/slices/cart.slice";
import { useGetProductsQuery } from "../../redux/services/product.service";
import Chip from "../Chip";

import "./styles.css";

const ProductList = () => {
  const { cartItems, selectedProduct } = useCustomSelector(
    (state) => state.cart
  );

  const { data: products, error, isLoading } = useGetProductsQuery("");

  const dispatch = useCustomDispatch();

  const renderQuantityChip = (product: Product) => {
    const item = cartItems.find((item) => item.id === product.id);
    return item?.quantity ? (
      <Chip
        label={item?.quantity}
        className="product-list-chip"
        data-testid="product-list-chip"
      />
    ) : null;
  };

  const isSelected = (product: Product) => {
    return selectedProduct?.id === product.id;
  };

  const handleSelect = (product: Product) => {
    dispatch(setSelectedProduct(product));
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader" />
        <strong>Loading products...</strong>
      </div>
    );
  }

  if (error) {
    return (
      <strong>
        Hubo un error inesperado, no se pueden mostrar los productos.
      </strong>
    );
  }

  return (
    <div className="product-list">
      <h3 className="subtitle">Store</h3>
      <div className="divider" />
      <div className="product-list-wrapper">
        {products?.map((product, index) => (
          <div
            key={index}
            data-testid="product-list-item"
            className={`product-list-item ${
              isSelected(product) ? "selected" : ""
            }`}
            onClick={() => handleSelect(product)}
          >
            {renderQuantityChip(product)}
            <img src={product.image} alt={product.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
