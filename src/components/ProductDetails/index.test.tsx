import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductDetails from './';
import cartReducer, {
  setSelectedProduct,
  setCartItems,
} from '../../redux/slices/cart.slice';
import type { Product, CartItem } from '../../models/product.model';

describe('ProductDetails', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });
  });

  test('renders product details', () => {
    const selectedProduct = {
      id: 1,
      title: 'Product A',
      price: 10.99,
      image: 'product_a.jpg',
      description: 'Product A description',
    } as Product;

    const cartItems: CartItem[] = [];

    store.dispatch(setSelectedProduct(selectedProduct));
    store.dispatch(setCartItems(cartItems));
    
    render(
      <Provider store={store}>
        <ProductDetails />
      </Provider>
    );

    expect(screen.getByText('Product A')).toBeInTheDocument();
    expect(screen.getByText('$ 10.99')).toBeInTheDocument();
    expect(screen.getByText('Product A description')).toBeInTheDocument();
  });

  test('increments quantity on add button click', () => {
    const selectedProduct = {
      id: 1,
      title: 'Product A',
      price: 10,
      image: 'product_a.jpg',
      description: 'Product A description',
    } as Product;

    const cartItems: CartItem[] = [];

    store.dispatch(setSelectedProduct(selectedProduct));
    store.dispatch(setCartItems(cartItems));

    render(
      <Provider store={store}>
        <ProductDetails />
      </Provider>
    );


    const addButton = screen.getByTestId('add-cart-item-button');
    fireEvent.click(addButton);

    const chip = screen.getByTestId('product-details-chip');
    expect(chip).toHaveTextContent('1');
  });

  test('decrements quantity on remove button click', () => {
    const selectedProduct = {
      id: 1,
      title: 'Product A',
      price: 10,
      image: 'product_a.jpg',
      description: 'Product A description',
    } as Product;

    const cartItems: CartItem[] = [
      {
        id: 1,
        title: 'Product A',
        price: 10,
        image: 'product_a.jpg',
        description: 'Product A description',
        quantity: 2,
      } as CartItem,
    ];

    store.dispatch(setSelectedProduct(selectedProduct));
    store.dispatch(setCartItems(cartItems));

    render(
      <Provider store={store}>
        <ProductDetails />
      </Provider>
    );

    const removeButton = screen.getByTestId('remove-cart-item-button')
    fireEvent.click(removeButton);

    const chip = screen.getByTestId('product-details-chip');
    expect(chip).toHaveTextContent('1');
  });
});
