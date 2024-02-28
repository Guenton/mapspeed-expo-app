import { AxiosRequestConfig } from 'axios';

import axiosEx from '$lib/navigation/axiosEx';
import { userUri } from '$lib/navigation/endpoints';
import { UserFormat } from '$lib/types/user';

const getAxiosConfig = (qrCode: string, controller?: AbortController): AxiosRequestConfig => ({
  params: {
    qr_code: qrCode,
  },
  signal: controller?.signal,
});

/**
 * Get Call to receive the user information for the Scanned QR Code
 */
export default (qrCode: string, controller?: AbortController) =>
  axiosEx.get<UserFormat[]>(`${userUri}`, getAxiosConfig(qrCode, controller)).then(({ data }) => {
    if (!data[0].id) {
      throw new Error('No Clients were found');
    }
    return data[0];
  });
