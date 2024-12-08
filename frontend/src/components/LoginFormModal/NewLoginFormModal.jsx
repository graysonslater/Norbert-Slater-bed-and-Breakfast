/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import './LoginFormModal.css';

import { Navigate, useNavigate } from 'react-router-dom';

import CustomModal from "../../context/CustomModal"

import * as sessionActions from '../../store/session';

/***********************************************************************************************************************************************/
//*                             INIT/function decleration
/***********************************************************************************************************************************************/

function NewLoginFormModal(){

    const dispatch = useDispatch();
    const [showConfirm, setShowConfirm] = useState(false)
    const [errors, setErrors] = useState({});
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");

/***********************************************************************************************************************************************/
//*                             event handlers
/***********************************************************************************************************************************************/

    const isFormValid = () => {
        return credential.length >= 4 && password.length >= 6;
    };

    const handleToggle = (e) => { //delete event/ toggle
        console.log("BUBbLE TEST")
        e.preventDefault();
        setShowConfirm(!showConfirm)
    }

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
            <button type="button" onClick={handleToggle}>Login</button>
            <>{showConfirm &&
                <CustomModal onClose={handleToggle}>
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
                        <button type="submit"  disabled={!isFormValid()}>Log In</button>
                    </form>
                    <button onClick={handleDemoLogin} className="demo-login-button">Log in as Demo User</button>
                </CustomModal>}
            </>
        </>
    )
}
export default NewLoginFormModal;