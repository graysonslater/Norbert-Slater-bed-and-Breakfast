/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useState, useEffect, useRef } from 'react';

import { useDispatch} from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { FaUserCircle } from 'react-icons/fa';

import * as sessionActions from '../../store/session';

/***********************************************************************************************************************************************/
//*                             INIT/function declaration
/***********************************************************************************************************************************************/

function ProfileButton({ user }) {
  
  const navigate = useNavigate()
  
  const dispatch = useDispatch();
 
  const [showMenu, setShowMenu] = useState(true);
 
  const ulRef = useRef();
  
/***********************************************************************************************************************************************/
//*                             FUNCTIONS
/***********************************************************************************************************************************************/

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);// This will toggle the menu visibility
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
  //Drop down menu html
  return (
    
    <>
      <button onClick={toggleMenu}>
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {showMenu && (
          <>
            <li>Hello {user.firstName}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
            <li>
              <button onClick={() => navigate('/manage')}>Manage Spots</button>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;