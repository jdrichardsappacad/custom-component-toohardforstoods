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

  return (
    <>
      <h1>Form Component</h1>
      <form>
        <label htmlFor='name'>
          <input
            className={nameMessage(nameError)}
            id='name'
            value={name}
            onChange={updateName}
            placeholder='Name'
          />
          <p className='form'>{nameError}</p>
        </label>
        <label htmlFor='email'>
          <input
            className={emailMessage(emailError)}
            id='email'
            value={email}
            onChange={updateEmail}
            placeholder='Email'
          />
          <p className='form'>{emailError}</p>
        </label>
      </form>
    </>
  );
};

export default Form;
