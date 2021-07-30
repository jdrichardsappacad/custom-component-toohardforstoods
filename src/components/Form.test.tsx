
import { fireEvent, render,} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Form from './Form';
jest.mock('../api')

test('renders form with title, content, tags and submit button', () => {
  const { getByPlaceholderText, getByText } = render(<Form />);
  getByPlaceholderText(/name/i);
  getByPlaceholderText(/email/i);
  getByPlaceholderText(/password/i);
  const submitBtn = getByText(/submit/i);
  fireEvent.click(submitBtn)
  expect(submitBtn).toBeDisabled()
});
