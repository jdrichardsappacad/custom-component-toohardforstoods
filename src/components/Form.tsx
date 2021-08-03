import { useState, useEffect, FormEvent } from 'react';

import { useTextInput } from '../hooks/textInput';
import { isEmail, isName, isPassword } from '../utils/validations';
import './Form.css';

type Submitter = {
  name: String;
  email: String;
  password: String;
};

const Form = () => {
  let [name, setName, updateName, nameError, nameMessage] =
    useTextInput(isName);

  let [email, setEmail, updateEmail, emailError, emailMessage] =
    useTextInput(isEmail);
  let [password, setPassword, updatePassword, passwordError, passwordMessage] =
    useTextInput(isPassword);

  const [nameErrShow, setNameErrShow] = useState(false);
  const [emailErrShow, setEmailErrShow] = useState(false);
  const [passwordErrShow, setPasswordErrShow] = useState(false);

  const [disable, setDisable] = useState(true);

  useEffect(() => {
    isPassword(password).length || isName(name).length || isEmail(email).length
      ? setDisable(true)
      : setDisable(false);
  }, [name, email, password]);

  const handleBlur = (value: string, type: string) => {
    value.length && type === 'name'
      ? setNameErrShow(true)
      : setNameErrShow(false);
    value.length && type === 'email'
      ? setEmailErrShow(true)
      : setEmailErrShow(false);
    value.length && type === 'password'
      ? setPasswordErrShow(true)
      : setPasswordErrShow(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const payload: Submitter = {
      name,
      email,
      password
    };

    console.log('Payload:', payload);
    const { name: pName } = payload;
    alert(`Thanks for signing up ${pName[0].toUpperCase}${pName.slice(1)}`);
    reset();
  };

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className='form-container'>
      <h1>Sign Up:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>
          <input
            className={nameErrShow ? nameMessage(nameError) : ''}
            id='name'
            value={name}
            onChange={updateName}
            onBlur={() => handleBlur(nameError, 'name')}
            placeholder='name'
          />
          <p className='form'>{nameErrShow && nameError}</p>
        </label>
        <label htmlFor='email'>
          <input
            className={emailErrShow ? emailMessage(emailError) : ''}
            id='email'
            value={email}
            onChange={updateEmail}
            onBlur={() => handleBlur(emailError, 'email')}
            placeholder='email'
          />
          <p className='form'>{emailErrShow && emailError}</p>
        </label>
        <label htmlFor='password'>
          <input
            type='password'
            className={passwordErrShow ? passwordMessage(passwordError) : ''}
            id='password'
            value={password}
            onChange={updatePassword}
            onBlur={() => handleBlur(passwordError, 'password')}
            placeholder='password'
          />
          <p className='form'>{passwordErrShow && passwordError}</p>
        </label>

        <button
          className={disable ? 'button-disable' : 'button-enable'}
          type='submit'
          disabled={disable}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
