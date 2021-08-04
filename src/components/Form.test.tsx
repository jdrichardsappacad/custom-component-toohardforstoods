import { fireEvent, render,screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isName, isEmail, isPassword } from '../utils/validations';
import '@testing-library/jest-dom/extend-expect';
import Form from './Form';

describe('signup functionality', () => {
  test('renders form with inputs and submit button', () => {
    const { getByPlaceholderText, getByText } = render(<Form />);
    const nameInput = getByPlaceholderText(/name/i);
    const emailInput =getByPlaceholderText(/email/i);
    const passwordInput =getByPlaceholderText(/password/i);
    const submitBtn = getByText(/submit/i);

    expect (nameInput.value).toBe('')
    expect (emailInput.value).toBe('')
    expect (passwordInput.value).toBe('')
    expect(submitBtn).toBeDisabled();


    fireEvent.change(nameInput, { target: { value: 'johnson' } });
    expect(nameInput.value).toMatch('johnson');
    fireEvent.change(emailInput, { target: { value: 'jd@me.com' } });
    expect(emailInput.value).toMatch('jd@me.com');
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    expect(passwordInput.value).toMatch('password');

  });

  test('isName should pass on correct input', () => {
    const text = 'jeffrey';
    expect(isName(text)).toBe('');
  });

  test('isName should fail on incorrect input', () => {
    const text = 'jd';
    expect(isName(text)).toBe('Length must be at least 3');
  });

  test('isName on Blur should render error message', () => {
    const { getByPlaceholderText, getByText } = render(<Form />);
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
