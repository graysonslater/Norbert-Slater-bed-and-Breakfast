/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import LoginFormModal from './components/LoginFormModal/LoginFormModal';

import SignupFormModal from './components/SignupFormModal/SignupFormModal';

import EditSpotModal from './components/GetOneSpot/EditSpotModal.jsx';

import Navigation from './components/Navigation/Navigation';

import GetAllSpots from './components/GetAllSpots/GetAllSpots';

import GetOneSpot from './components/GetOneSpot/GetOneSpot.jsx'

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
    <div className="navStyle">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </div>
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
        element: <GetAllSpots />
      },
      {
        path:'spots/:spotId',
        element: <GetOneSpot />
      },
      {
        path: "login",
        element: <LoginFormModal />
      },
      {
        path: "signup",
        element: <SignupFormModal />
      },
      {
        path: "spots/:spotId/edit",
        element: <EditSpotModal />
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