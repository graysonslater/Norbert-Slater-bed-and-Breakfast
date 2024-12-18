/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';

import EditSpotModal from './components/EditSpot/EditSpotModal.jsx';

import Navigation from './components/Navigation/Navigation';

import GetAllSpots from './components/GetAllSpots/GetAllSpots';

import GetOneSpot from './components/GetOneSpot/GetOneSpot.jsx'

import AddReviewModal from './components/GetOneSpot/AddReviewModal.jsx';

import CreateSpot from "./components/CreateSpot/CreateSpot.jsx"

import ManageSpots from './components/ManageSpots/ManageSpots.jsx';

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
        path: "spots/:spotId/edit",
        element: <EditSpotModal />
      },
      {
        path: "spots/:spotId/review",
        element: <AddReviewModal />
      },
      {
        path: "spots/new",
        element: <CreateSpot />
      },
      {
        path: "/manage",
        element: <ManageSpots />
      },
      {
        path: '*',
        element: <Navigate to='/' replace ={true} />
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