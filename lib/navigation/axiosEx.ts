/*

The axiosEx.ts utility exposes a pre-configured axios object by default
- The configured axios object is renamed to axiosEx to prevent confusion with axios defaults
- The server baseURL is read from the application root .env file
- The default timeout in ms is set accordingly
- The response errors are handled using the imported axiosExErr.js utility function

The axiosEx.js utility also exposes a setaxiosExToken function
- The exposed setaxiosExToken function takes a token string and stores it in to the Authorization header
- The token is pre-pended with 'Bearer ' as per IANA standardization code RFC6750

Docs:
- Axios Config Docs: https://github.com/axios/axios 
- Header Format Docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization 
- RFC6750 Standard Docs: https://tools.ietf.org/html/rfc6750 

---> TL;DR This file is simply a preconfigured axios module <---

*/

import axios, { AxiosError } from 'axios';

import type { StrapiErrorFormat } from '$lib/types/strapi';

// Set Axios defaults
const baseURL = process.env.EXPO_PUBLIC_FAPPI_BASE_URL;
const axiosEx = axios.create({ baseURL, timeout: 30000, data: undefined });

// Response Interceptor to Automatically handle errors
axiosEx.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: Error | AxiosError) => {
    if (axios.isAxiosError(error)) {
      // Resolve if Request was Aborted
      if (axios.isCancel(error)) {
        console.info('📞 AXIOS - Request Aborted');
        return Promise.resolve('Request Aborted');
      }

      const handledError = axiosErrorHandler(error);
      return Promise.reject(handledError);
    } else {
      return Promise.reject(error);
    }
  },
);

export default axiosEx;

/**
 * Set the Axios token in the header
 *
 * **Note* If the token is blank, it will clear the Authorization header
 *
 * The resulting header key will be: `"Authorization": "Bearer [token]"`
 *
 * @param token
 * @returns a user friendly string indicating the result
 */
export const setAxiosExToken = (token?: string) => {
  if (!token) {
    axiosEx.defaults.headers.common.Authorization = '';
    return 'Token - Session Token Cleared';
  } else {
    axiosEx.defaults.headers.common.Authorization = 'Bearer ' + token;
    return 'Token - Session Token Applied';
  }
};

/**
 * Set the Axios token in the header Asynchronously.
 * The promise cannot fail thus doesn't require catching the error
 *
 * **Note* If the token is blank, it will clear the Authorization header
 *
 * The resulting header key will be: `"Authorization": "Bearer [token]"`
 *
 * @param token
 * @returns a user friendly string indicating the result
 */
export const setAxiosExTokenAsync = async (token?: string) => {
  if (!token) {
    axiosEx.defaults.headers.common.Authorization = '';
    return 'Token - Session Token Cleared';
  } else {
    axiosEx.defaults.headers.common.Authorization = 'Bearer ' + token;
    return 'Token - Session Token Applied';
  }
};

/**
 * Handle standard Axios Errors
 *
 * @param error
 * @returns an error object
 */
export const axiosErrorHandler = (error: AxiosError) => {
  if (error.message === 'Network Error') {
    console.warn('📞 AXIOS - Network Error');
    return new Error('Unable to connect to server, please check your connection');
  } else if (error.code === 'ECONNREFUSED') {
    console.warn('📞 AXIOS - Connection Error: ' + error);
    return new Error('Your connection with the server was refused, please try again later');
  } else if (error.response && typeof error.response.data === 'object') {
    // Acomodate Strapi Specific Error inside the Axios Error.
    const cmsError = error.response.data as StrapiErrorFormat | StrapiErrorFormat[];
    const strapiError = formatStrapiError(cmsError);
    console.warn('🗃️ CMS - Response Error: ' + strapiError);
    return new Error(strapiError);
  } else if (error.response?.data) {
    console.warn('📞 AXIOS - Response Error: ' + error.response.data);
    return new Error(error.response.data.toString());
  } else if (error.response) {
    console.warn('📞 AXIOS - Response Error: ' + error.response);
    return new Error(error.response.toString());
  } else if (error.message.startsWith('timeout of')) {
    console.warn('📞 AXIOS - Timeout Error: ' + error.message);
    return new Error('The request timed out, please check your connection');
  } else {
    console.warn('📞 AXIOS - General Error: ' + error);
    return new Error('There was an error processing your request');
  }
};

/** Format an asumed strapi error into a string */
const formatStrapiError = (strapiError: StrapiErrorFormat | StrapiErrorFormat[] | null) => {
  if (!strapiError) return 'An Unknown CMS Error occurred';
  if (Array.isArray(strapiError)) return strapiError[0].data;
  if (Array.isArray(strapiError.data)) {
    if (strapiError.data[0].messages[0].message) return strapiError.data[0].messages[0].message;
    if (strapiError.data[0].messages[0].id) return strapiError.data[0].messages[0].id;
  }
  if (strapiError.message) return strapiError.message;
  if (strapiError.data) return strapiError.data;
  return strapiError;
};
