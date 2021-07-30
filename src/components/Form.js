import { useState } from 'react';
import { useTextInput } from '../hooks/textInput';
import { isEmail, isName } from '../utils/validations';
import './Form.css';

const Form = () => {
  const [name, updateName, nameError, nameMessage] = useTextInput({
    validation: isName,
  });

  const [email, updateEmail, emailError, emailMessage] = useTextInput({
    validation: isEmail,
  });

  const [nameErrShow, setNameErrShow] = useState(false);
  const [emailErrShow, setEmailErrShow] = useState(false);

  const [disable, setDisable] = useState(true);

  const handleBlur = (value, type) => {
    value.length && type === 'name'
      ? setNameErrShow(true)
      : setNameErrShow(false);
    value.length && type === 'email'
      ? setEmailErrShow(true)
      : setEmailErrShow(false);
    isName(name).length || isEmail(email).length
      ? setDisable(true)
      : setDisable(false);
  };

  return (
    <>
      <h1>Form Component</h1>
      <form>
        <label htmlFor='name'>
          <input
            className={nameErrShow ? nameMessage(nameError) : ''}
            id='name'
            value={name}
            onChange={updateName}
            onBlur={() => handleBlur(nameError, 'name')}
            placeholder='Name'
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
            placeholder='Email'
          />
          <p className='form'>{emailErrShow && emailError}</p>
        </label>

        <button disabled={disable}>Submit</button>
      </form>
    </>
  );
};

export default Form;
