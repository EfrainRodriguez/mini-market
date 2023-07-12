import type { CartItem } from "../models/product.model";

export const getTotal = (cartItems: CartItem[]) => {
  return cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0);
};
