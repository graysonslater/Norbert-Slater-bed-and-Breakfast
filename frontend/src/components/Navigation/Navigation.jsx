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
      <li>
        <ProfileButton user={sessionUser} />
      </li>
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

  return ( //RENDER NAVLINKS, isLoaded ensures links are only displayed after data has been loaded
    <ul className="navLinks">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {isLoaded && sessionLinks} 
    </ul>
  );
}

export default Navigation;