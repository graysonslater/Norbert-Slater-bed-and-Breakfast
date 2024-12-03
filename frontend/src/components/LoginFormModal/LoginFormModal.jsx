/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

// import { useModal } from '../../context/Modal';

import * as sessionActions from '../../store/session';

import './LoginFormModal.css';

import { Navigate } from 'react-router-dom';

/***********************************************************************************************************************************************/
//*                             INIT/
/***********************************************************************************************************************************************/

function LoginFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

/***********************************************************************************************************************************************/
//*                             FORM SUBMISSION HANDLER
/***********************************************************************************************************************************************/

  const isFormValid = () => {
    return credential.length >= 4 && password.length >= 6;
  };

  //redirect logic
  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors({ credential: "The provided credentials were invalid" });
        }
      });
  };

  const handleDemoLogin = () => {
    const demoCredential = 'demo@user.io';
    const demoPassword = 'password';
    return dispatch(sessionActions.login({ credential: demoCredential, password: demoPassword }))
  };

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && <p className="error-message">{errors.credential}</p>}
        <button type="submit" disabled={!isFormValid()}>Log In</button>
      </form>
      <button onClick={handleDemoLogin} className="demo-login-button">Log in as Demo User</button>
    </>
  );
}

export default LoginFormModal;