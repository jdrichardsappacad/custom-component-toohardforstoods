import { useState } from 'react';

export const useTextInput = ({ validation, defaultValue = '' }) => {
  const [value, setValue] = useState(defaultValue);
  const updateValue = event => setValue(event.target.value);
  const error = validation(value);
  const errorMesssage = value => (value.length ? 'border-error' : 'border');
  return [value, updateValue, error, errorMesssage];
};
