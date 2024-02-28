import axiosEx from '$lib/navigation/axiosEx';
import { tripUri } from '$lib/navigation/endpoints';
import type { TripFormat } from '$lib/types/trip';

/**
 * Get Call to receive the trip from the server by its TripId
 */
export default (id: number | string, controller?: AbortController) =>
  axiosEx
    .get<TripFormat>(`${tripUri}/${id}`, { signal: controller?.signal })
    .then(({ data }) => data);
