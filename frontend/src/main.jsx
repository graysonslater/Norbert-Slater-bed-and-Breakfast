/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

//imports the React library: create components, manage state, handle lifecycle methods
import React from 'react';
//used for rendering React components into the DOM
import ReactDOM from 'react-dom/client';
//imports the main application component
import App from './App';
//import styles for app
import './index.css';
//makes the Redux store available to all nested components in app
import {Provider} from 'react-redux';
//responsible for creating and configuring the Redux store: setting up reducers, middleware, enhancers 
import configureStore from './store/store';
// restoreCSRF restores or generate a new CSRF token, csrfFetch adds the CSRF token to the request headers
import { restoreCSRF, csrfFetch } from './store/csrf';
//gets session reducer and all aexported functions/thunks/objects
import * as sessionActions from './store/session';

/***********************************************************************************************************************************************/
//*                             INITIALIZE STORE
/***********************************************************************************************************************************************/

const store = configureStore();

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  //Making the following items globally accessable
  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

/***********************************************************************************************************************************************/
//*                             MAIN APPLICATION
/***********************************************************************************************************************************************/

//provider gives all fucntion components access to the store
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>
);