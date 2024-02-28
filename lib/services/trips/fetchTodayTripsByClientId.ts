import { AxiosRequestConfig } from 'axios';
import moment from 'moment';

import axiosEx from '$lib/navigation/axiosEx';
import { tripUri } from '$lib/navigation/endpoints';
import type { TripFormat } from '$lib/types/trip';

const getAxiosConfig = (id: number | string, controller?: AbortController): AxiosRequestConfig => ({
  params: {
    date_time_eq: moment().format('YYYY-MM-DD'),
    clients_in: id,
    _limit: -1,
    _sort: 'date_time:asc',
  },
  signal: controller?.signal,
});

/**
 * Get Call to receive the list of trips from the server in which the ClientId is a passenger
 *
 * Only Trips scheduled on the current date are returned in ascending order
 *
 */
export default (id: number | string, controller?: AbortController) =>
  axiosEx.get<TripFormat[]>(tripUri, getAxiosConfig(id, controller)).then(({ data }) => {
    if (!data[0].id) {
      throw new Error('No trips scheduled today for this client');
    }
    return data;
  });
