import { render, screen } from '@testing-library/react';
import App from './App'; 

// Test case to check if "learn react" link is rendered
test('renders learn react link', () => {
  render(<App />); // Rendering App component
  const linkElement = screen.getByText(/learn react/i); // Getting element by text
  expect(linkElement).toBeInTheDocument(); // Expecting element to be in the document
});
