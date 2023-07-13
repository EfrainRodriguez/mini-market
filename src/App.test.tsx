import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Mini Market navbar brand', () => {
  render(<App />);
  const linkElement = screen.getByText(/Mini Market/i);
  expect(linkElement).toBeInTheDocument();
});
