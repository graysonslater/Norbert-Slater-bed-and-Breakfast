//IMPORTS
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx';
import LoginFormModal from '../LoginFormModal/LoginFormModal.jsx';
import SignupFormModal from '../SignupFormModal/SignupFormModal.jsx';
import './Navigation.css';

//FUNCTION COMPONENT
function Navigation({ isLoaded }) {
  
  
  //DETERMINE IF USER IS LOGGGED IN
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) { //IF USER IS LOGGED IN
    sessionLinks = (
      <>
        <li>
            <ProfileButton user={sessionUser} />
        </li>
      </>
    );
  } else { //IF USER IS NOT LOGGED IN
    sessionLinks = (
      <div className="loginSignUp">
        <li>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
          />
        </li>
        <li>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
          />
        </li>
      </div>
    );
  }

  return (
    <nav className="navbar">
      <NavLink to="/"><img src="/favicon-32x32.png" alt="icon" /></NavLink>
      <ul className="navLinks">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {isLoaded && (
        <div className="session-links">
            {sessionLinks}
        </div>
        )}
      </ul>
    </nav>
  )
}

export default Navigation;