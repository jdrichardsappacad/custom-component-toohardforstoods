import { FormEvent, useState } from 'react';



export const useTextInput =(validation:(value:string)=>string,defaultValue='')  => {
  const [value, setValue] = useState<string>(defaultValue);
 
  const updateValue = (event:FormEvent<HTMLInputElement>) => setValue(event.currentTarget.value);
  const error = validation(value);
  const errorMesssage = (value:string) => (value.length ? 'border-error' : 'border');
  return [value, setValue,updateValue, error, errorMesssage] as const;
};
