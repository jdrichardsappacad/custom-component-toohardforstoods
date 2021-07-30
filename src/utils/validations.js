export const isName = value =>
  value.length < 3 ? 'Length must be at least 3' : '';

export const isEmail = value =>
  !value.includes('@') ? 'Please use a proper email' : '';

export const isPassword = value =>
  value.length < 6 ? 'Password length must be 6 or greater' : '';
