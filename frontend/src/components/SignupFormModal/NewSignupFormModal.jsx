/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/
/* eslint-disable */
import CustomModal from "../../context/CustomModal"

import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import * as sessionActions from '../../store/session';

import './SignupFormModal.css';

/***********************************************************************************************************************************************/
//*                             INIT/Function declaration
/***********************************************************************************************************************************************/

function NewSignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false)

  /***********************************************************************************************************************************************/
//*                             FORM SUBMISSION HANDLER
/***********************************************************************************************************************************************/

const handleToggle = (e) => { //delete event/ toggle
    
    e.preventDefault();
    setEmail()
    setUsername("")
    setFirstName()
    setLastName()
    setPassword()
    setConfirmPassword()
    setShowConfirm(!showConfirm)
}

const isFormValid = () => {
    return email && username.length >= 4 && firstName && lastName && password.length >= 6  && confirmPassword;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/

  return (
    <>
        <button type="button" onClick={handleToggle}>SignUp</button>
        <>{showConfirm &&
            <CustomModal onClose={handleToggle}>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </label>
                    {errors.email && <p>{errors.email}</p>}
                    <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    </label>
                    {errors.username && <p>{errors.username}</p>}
                    <label>
                    First Name
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    </label>
                    {errors.firstName && <p>{errors.firstName}</p>}
                    <label>
                    Last Name
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    </label>
                    {errors.lastName && <p>{errors.lastName}</p>}
                    <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </label>
                    {errors.password && <p>{errors.password}</p>}
                    <label>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    </label>
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                    <button type="submit" disabled={!isFormValid()}>Sign Up</button>
                </form>
            </CustomModal>}
        </>
    </>
  );
}

export default NewSignupFormModal;