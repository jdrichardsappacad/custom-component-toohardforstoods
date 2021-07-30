import { useState, useEffect,FormEvent } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { useTextInput } from '../hooks/textInput';
import { isEmail, isName, isPassword } from '../utils/validations';
import './Form.css';

type Submitter = {
  name:String,
  email:String,
  password:String
}

const MySwal = withReactContent(Swal);

const Form = () => {
  const [name, updateName, nameError, nameMessage] = useTextInput(
     isName
  );

  const [email, updateEmail, emailError, emailMessage] = useTextInput(
     isEmail,
  );
  const [
    password,
    updatePassword,
    passwordError,
    passwordMessage,
  ] = useTextInput(
    isPassword,
  );

  const [nameErrShow, setNameErrShow] = useState(false);
  const [emailErrShow, setEmailErrShow] = useState(false);
  const [passwordErrShow, setPasswordErrShow] = useState(false);

  const [disable, setDisable] = useState(true);

  useEffect(() => {
    isPassword(password).length || isName(name).length || isEmail(email).length
      ? setDisable(true)
      : setDisable(false);
  }, [name, email, password]);

  const handleBlur = (value:string, type:string) => {
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

  const handleSubmit = (event: FormEvent):void => {
    event.preventDefault();
    const payload:Submitter = {
      name,
      email,
      password,
    };

    console.log('Payload:', payload);

    MySwal.fire({
      title: (
        <p className='payloadMessage'>{`Thanks for signing up ${payload.name[0].toUpperCase()}${payload.name.slice(
          1
        )}!`}</p>
      ),
    });
  };

  return (
    <div className='form-container'>
      {console.log(name, email, password)}
      <h4>Sign Up:</h4>
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

        <button type='submit' disabled={disable}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
