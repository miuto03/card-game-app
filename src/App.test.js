import { render, screen } from '@testing-library/react';
import App from './App';

test('renders game layout', () => {
  render(<App />);
  const enemyLifeElement = screen.getByText(/Enemy Life/i);
  expect(enemyLifeElement).toBeInTheDocument();
});
