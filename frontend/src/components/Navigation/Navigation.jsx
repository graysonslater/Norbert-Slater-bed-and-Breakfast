//IMPORTS
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton/OpenModalButton.jsx';
import NewSignupFormModal from '../SignupFormModal/NewSignupFormModal.jsx';
import NewLoginFormModal from '../LoginFormModal/NewLoginFormModal.jsx';
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
          <NewLoginFormModal />
        </li>
        <li>
          <NewSignupFormModal />
        </li>
      </div>
    );
  }

  //create Spot button
  let createSpotButton;
  if (sessionUser){
    createSpotButton = (
      <NavLink to="/spots/new"><button>Create a New Spot</button></NavLink>
    )
  }

  return (
    <nav className="navbar">
      <NavLink to="/"><img src="/favicon-32x32.png" alt="icon" /></NavLink>
      <ul className="navLinks">
        <li className="createSpotButton">
          {createSpotButton}
        </li>
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