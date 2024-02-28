import axiosEx from '$lib/navigation/axiosEx';
import { userUri } from '$lib/navigation/endpoints';
import { UserFormat } from '$lib/types/user';

/**
 * Get Call to receive the currently authenticated user from the server
 *
 * Data will be returned but not set to state
 */
export default (controller?: AbortController) =>
  axiosEx.get<UserFormat>(`${userUri}/me`, { signal: controller?.signal }).then(({ data }) => data);
