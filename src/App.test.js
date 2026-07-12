import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page welcome message', () => {
  render(<App />);
  const heading = screen.getByText(/Bienvenidos a nuestra Tienda/i);
  expect(heading).toBeInTheDocument();
});
