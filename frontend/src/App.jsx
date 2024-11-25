/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import LoginFormModal from './components/LoginFormModal/LoginFormModal';

import SignupFormModal from './components/SignupFormModal/SignupFormModal';

import Navigation from './components/Navigation/Navigation';

import * as sessionActions from './store/session';

/***********************************************************************************************************************************************/
//*                             STATE MANAGMENT
//             (track whether the user session has been restored)
/***********************************************************************************************************************************************/

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

/***********************************************************************************************************************************************/
//*                             RESTORE USER SESSION
/***********************************************************************************************************************************************/

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

/***********************************************************************************************************************************************/
//*                             ROUTER CONFIG
/***********************************************************************************************************************************************/

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>Welcome!</h1>
      },
      {
        path: "login",
        element: <LoginFormModal />
      },
      {
        path: "signup",
        element: <SignupFormModal />
      }
    ]
  }
]);

/***********************************************************************************************************************************************/
//*                             ROUTER PROVIDER
/***********************************************************************************************************************************************/

function App() {
  return <RouterProvider router={router} />;
}

/***********************************************************************************************************************************************/

export default App;