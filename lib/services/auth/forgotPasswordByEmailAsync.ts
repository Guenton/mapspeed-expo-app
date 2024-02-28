import axiosEx from '$lib/navigation/axiosEx';
import { forgotPasswordUri } from '$lib/navigation/endpoints';

/** Post Call to server to request user password reset */
export default (email: string, controller?: AbortController) =>
  axiosEx.post(forgotPasswordUri, { email }, { signal: controller?.signal });
