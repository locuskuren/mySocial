import { useState, useEffect } from 'react';
import validator from 'validator';
import { useSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error } = useSelector((state) => state.user);
  const { userLogin, userErrorReset } = useActions();

  useEffect(() => {
    return () => {
      userErrorReset();
    };
  }, [userErrorReset]);

  const validate = validator.isEmail(email) && password;

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    userLogin(email.toLocaleLowerCase(), password);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        placeholder="email"
        type="email"
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
      />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={!validate || loading}>
        Log In
      </button>
      <span>{error}</span>
    </form>
  );
};

export default Login;
