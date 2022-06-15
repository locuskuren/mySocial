import { useState } from 'react';

import Login from '../../components/Login/Login';
import SignUp from '../../components/SignUp/SignUp';
import './Auth.scss';

const Auth: React.FC = () => {
  const [loginForm, setLoginForm] = useState(true);

  return (
    <div className="auth">
      <div className="phone">
        <div className="phone-bg"></div>
      </div>
      <div className="content">
        <div className="form-box">
          <span className="logo">mySocial</span>
          {loginForm && <Login />}
          {!loginForm && <SignUp />}
        </div>
        <div className="switch-form-box">
          {loginForm && (
            <span>
              Don't have an account?
              <span onClick={() => setLoginForm(false)}>Sign up</span>
            </span>
          )}
          {!loginForm && (
            <span>
              Have an account?
              <span onClick={() => setLoginForm(true)}>Log in</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
