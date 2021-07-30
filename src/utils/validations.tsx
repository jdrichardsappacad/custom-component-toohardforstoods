export const isName = (value:string) =>
  value.length < 3 ? 'Length must be at least 3' : '';

export const isEmail = (value:string) =>
  !value.includes('@') ? 'Please use a proper email' : '';

export const isPassword = (value:string) =>
  value.length < 6 ? 'Password length must be 6 or greater' : '';
