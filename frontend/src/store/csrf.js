/***********************************************************************************************************************************************/
//*                             IMPORTS
/***********************************************************************************************************************************************/

import Cookies from 'js-cookie';

/***********************************************************************************************************************************************/
//*                             XSRF-TOLKIEN HANDLER
/***********************************************************************************************************************************************/

//non-GET request require XSRF tolkiens!!!
export async function csrfFetch(url, options = {}) {
  
  options.method = options.method || 'GET';// set options.method to 'GET' if there is no method
  
  options.headers = options.headers || {};  // set options.headers to an empty object if there is no headers

  if (options.method.toUpperCase() !== 'GET') { // if the options.method is not 'GET', case insensitive
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json'; //Sets the Content-Type header to 'application/json' if not already specified, for non-GET requests.
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN'); //Adds the XSRF-Token header with the value from the 'XSRF-TOKEN' cookie (on browser), for non-GET requests
  }
  
  const res = await window.fetch(url, options);// call the default window's fetch with the url and the options passed in

  if (res.status >= 400) throw res;// if the response status code is 400 or above, then throw an error with the error being the response

  return res;// if the response status code is under 400, then return the response to the next promise chain
}

/***********************************************************************************************************************************************/
//*                             GET AN XSRF-TOLKIEN (restore CSRF)
//                             (should only be used in development)
/***********************************************************************************************************************************************/

export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
  }