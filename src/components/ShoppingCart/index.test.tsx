import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ShoppingCart from './';
import cartReducer, { setCartItems } from '../../redux/slices/cart.slice';
import type { CartItem } from '../../models/product.model';
import { RootState } from '../../redux/store';

describe('ShoppingCart', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });
  });

  test('renders shopping cart items correctly', () => {
    const cartItems = [
      {
        id: 1,
        title: 'Product A',
        price: 10,
        image: 'product_a.jpg',
        quantity: 2,
      },
      {
        id: 2,
        title: 'Product B',
        price: 20,
        image: 'product_b.jpg',
        quantity: 3,
      },
    ];

    store.dispatch(setCartItems(cartItems as CartItem[]));

    render(
      <Provider store={store}>
        <ShoppingCart />
      </Provider>
    );

    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();

    const shoppingCartItems = screen.getAllByTestId('shopping-cart-item');
    expect(shoppingCartItems).toHaveLength(cartItems.length);

    shoppingCartItems.forEach((item, index) => {
      const cartItem = cartItems[index];
      expect(item).toHaveTextContent(cartItem.title);
      expect(item).toHaveTextContent(`$ ${cartItem.price}`);
      expect(item).toHaveTextContent(`$ ${(cartItem.price * cartItem.quantity).toLocaleString()}`);
    });
  });

  test('selects product on click', () => {
    const cartItems = [
      {
        id: 1,
        title: 'Product A',
        price: 10,
        image: 'product_a.jpg',
        quantity: 2,
      },
    ];

    store.dispatch(setCartItems(cartItems as CartItem[]));

    render(
      <Provider store={store}>
        <ShoppingCart />
      </Provider>
    );

    const shoppingCartItem = screen.getByTestId('shopping-cart-item');
    fireEvent.click(shoppingCartItem);

    const selectedProduct = (store.getState() as RootState).cart.selectedProduct;
    expect(selectedProduct).toEqual(cartItems[0]);
  });
});
