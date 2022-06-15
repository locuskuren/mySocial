import { useState, useEffect } from 'react';
import validator from 'validator';
import { useSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error } = useSelector((state) => state.user);
  const { userRegister, userErrorReset } = useActions();

  useEffect(() => {
    return () => {
      userErrorReset();
    };
  }, [userErrorReset]);

  const validate = name && password && validator.isEmail(email);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    userRegister(name.toLocaleLowerCase(), password, email.toLocaleLowerCase());
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        placeholder="email"
        type="email"
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
      />
      <input
        placeholder="name"
        type="text"
        onChange={(e) => setName(e.target.value.toLowerCase())}
      />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={!validate || loading}>
        Sign Up
      </button>
      {error && <span>{error}</span>}
    </form>
  );
};

export default SignUp;
