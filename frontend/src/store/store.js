/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

//CS makes store which will hold app's state, CR allows multiple reducers to be combined, AM intercepts actions dispatched to store, Compose allows multiple store enhancers into a single enhancer
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
//allows action creators to return functions
import {thunk} from 'redux-thunk'
//grabs session reducer
import sessionReducer from './session';

import spotsReducer from './spots';

/***********************************************************************************************************************************************/
//*                             REDUCER
/***********************************************************************************************************************************************/

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer
})

/***********************************************************************************************************************************************/
//*                             ENHANCER 
//                    (thunk middleware/ Logger)
/***********************************************************************************************************************************************/

//Applies logger AND thunk middleware only in development mode
let enhancer;
if (import.meta.env.MODE === 'production') { //check if app is in production mode
  enhancer = applyMiddleware(thunk); // if prod only 'redux-thunk' middleware is applied
} else { // if in Development mode

  //!UNSURE ABOUT THE AWAIT BEING USED HERE!!!
  const logger = (await import("redux-logger")).default; // import logger middleware used to log actions and state changes
  
  const composeEnhancers = //check for Redux DevTools in browser
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // if tools not present use compose
  enhancer = composeEnhancers(applyMiddleware(thunk, logger)); //apply thunk middleware and the logger 
}

/***********************************************************************************************************************************************/
//*                             CONFIGURE STORE
/***********************************************************************************************************************************************/

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };

/***********************************************************************************************************************************************/

export default configureStore;