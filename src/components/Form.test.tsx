import { fireEvent, render } from '@testing-library/react';
import { isName, isEmail, isPassword } from '../utils/validations';
import '@testing-library/jest-dom/extend-expect';
import Form from './Form';

describe('login', () => {
  test('renders form with title, content, tags and submit button', () => {
    const { getByPlaceholderText, getByText } = render(<Form />);
    getByPlaceholderText(/name/i);
    getByPlaceholderText(/email/i);
    getByPlaceholderText(/password/i);
    const submitBtn = getByText(/submit/i);
    fireEvent.click(submitBtn);
    expect(submitBtn).toBeDisabled();
  });

  test('isName should pass on correct input', () => {
    const text = 'jeffrey';
    expect(isName(text)).toBe('');
  });

  test('isName should fail on incorrect input', () => {
    const text = 'jd';
    expect(isName(text)).toBe('Length must be at least 3');
  });

  test('isEmail should pass on correct input', () => {
    const text = 'jd@me.com';
    expect(isEmail(text)).toBe('');
  });

  test('isEmail should fail on incorrect input', () => {
    const text = 'jdme.com';
    expect(isEmail(text)).toBe('Please use a proper email');
  });

  test('isPassword should pass on correct input', () => {
    const text = 'password';
    expect(isPassword(text)).toBe('');
  });

  test('isPassword should pass on correct input', () => {
    const text = 'po';
    expect(isPassword(text)).toBe('Password length must be 6 or greater');
  });
});
