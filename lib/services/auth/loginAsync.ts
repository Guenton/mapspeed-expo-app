import axiosEx, { setAxiosExToken } from '$lib/navigation/axiosEx';
import { loginUri } from '$lib/navigation/endpoints';
import type { AuthLoginFormat, AuthLoginResponseFormat } from '$lib/types/auth';

/**
 * Post Call to server to login by delivering `LoginFormat`.
 *
 * If the login is successful the token will also be set in the `Authorization` header for future requests.
 */
export default (loginFormat: AuthLoginFormat, controller?: AbortController) =>
  axiosEx
    .post<AuthLoginResponseFormat>(loginUri, loginFormat, { signal: controller?.signal })
    .then(({ data }) => {
      if (!data.jwt) {
        throw new Error('No Token Received from server');
      }

      setAxiosExToken(data.jwt);
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
