import axiosEx from '$lib/navigation/axiosEx';
import { tripUri } from '$lib/navigation/endpoints';
import type { TripFormat } from '$lib/types/trip';

/**
 * Put Call to end a trip by its TripId
 */
export default (id: number | string, controller?: AbortController) =>
  axiosEx
    .put<TripFormat>(`${tripUri}/${id}`, { status: 'COMPLETED' }, { signal: controller?.signal })
    .then(({ data }) => data);
