/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useState, useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { FaUserCircle } from 'react-icons/fa';

import * as sessionActions from '../../store/session';

import OpenModalMenuItem from './OpenModalMenuItem';

import LoginFormModal from '../LoginFormModal/LoginFormModal.jsx';

import SignupFormModal from '../SignupFormModal/SignupFormModal.jsx';

/***********************************************************************************************************************************************/
//*                             INIT
/***********************************************************************************************************************************************/

function ProfileButton({ user }) {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

/***********************************************************************************************************************************************/
//*                             FUNCTIONS
/***********************************************************************************************************************************************/

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  //CLOSE DROPDOWN MENU WHEN CLICK OCCURS OUTSIDE
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  //CLOSE DROPDOWN MENU WHEN FALSE
  const closeMenu = () => setShowMenu(false);

  //DISPATCH LOGOUT ACTION, CLOSES DROPDOWN MENU
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

/***********************************************************************************************************************************************/
//*                             HTML
/***********************************************************************************************************************************************/

  return (
    <>
      <button onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hello {user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;