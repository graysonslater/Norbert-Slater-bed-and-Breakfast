/***********************************************************************************************************************************************/
//*                             IMPORTS/INIT
/***********************************************************************************************************************************************/

import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App';

import './index.css';

import { Provider } from 'react-redux';

import configureStore from './store/store.js';

import { restoreCSRF, csrfFetch } from './store/csrf';

import * as sessionActions from './store/session';

import { Modal, ModalProvider } from './context/Modal.jsx';
//initialize store which contains all reducers/action objects
const store = configureStore();

/***********************************************************************************************************************************************/
//*                             Development Environment Checks
//                        (runs only in non-production environments)
/***********************************************************************************************************************************************/

if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

/***********************************************************************************************************************************************/
//*                             REACT APP RENDERING
/***********************************************************************************************************************************************/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <App />
        <Modal />
      </Provider>
    </ModalProvider>
  </React.StrictMode>
);