import { useState, useEffect } from 'react';
import { useTextInput } from '../hooks/textInput';
import { isEmail, isName, isPassword } from '../utils/validations';
import './Form.css';

const Form = () => {
  const [name, updateName, nameError, nameMessage] = useTextInput({
    validation: isName,
  });

  const [email, updateEmail, emailError, emailMessage] = useTextInput({
    validation: isEmail,
  });
  const [
    password,
    updatePassword,
    passwordError,
    passwordMessage,
  ] = useTextInput({
    validation: isPassword,
  });

  const [nameErrShow, setNameErrShow] = useState(false);
  const [emailErrShow, setEmailErrShow] = useState(false);
  const [passwordErrShow, setPasswordErrShow] = useState(false);

  const [disable, setDisable] = useState(true);

  useEffect(() => {
    isPassword(password).length || isName(name).length || isEmail(email).length
      ? setDisable(true)
      : setDisable(false);
  }, [name, email, password]);

  const handleBlur = (value, type) => {
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

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      name,
      email,
      password,
    };

    console.log(payload);
  };

  return (
    <>
      <h1>Form Component</h1>
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
            className={emailErrShow ? passwordMessage(passwordError) : ''}
            id='password'
            value={password}
            onChange={updatePassword}
            onBlur={() => handleBlur(passwordError, 'password')}
            placeholder='password'
          />
          <p className='form'>{passwordErrShow && passwordError}</p>
        </label>

        <button disabled={disable}>Submit</button>
      </form>
    </>
  );
};

export default Form;
