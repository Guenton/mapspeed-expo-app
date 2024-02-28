import { AxiosRequestConfig } from 'axios';
import moment from 'moment';

import axiosEx from '$lib/navigation/axiosEx';
import { tripUri } from '$lib/navigation/endpoints';
import type { TripFormat } from '$lib/types/trip';

const getAxiosConfig = (id: number | string, controller?: AbortController): AxiosRequestConfig => ({
  params: {
    _where: [{ date_time_gte: moment().format('YYYY-MM-DD') }, { 'driver.id': id }],
    _limit: -1,
    _sort: 'date_time:asc',
  },
  signal: controller?.signal,
});

/**
 * Get Call to receive the list of trips from the server in which the ClientId is a passenger
 *
 * Only Trips starting from the current date and onwards are returned in ascending order
 *
 */
export default (id: number | string, controller?: AbortController) =>
  axiosEx.get<TripFormat[]>(tripUri, getAxiosConfig(id, controller)).then(({ data }) => data);
