import { atom } from 'recoil';

import type { AlertType } from '$lib/types/alert';

// Alert
export const alertTextState = atom({ key: 'alertTextState', default: '' });
export const alertTypeState = atom<AlertType>({ key: 'alertTypeState', default: '' });

// Loading
export const isLoadingState = atom({ key: 'isLoadingState', default: false });

// Pagination
export const pageSizeState = atom({ key: 'pageSizeState', default: 25 });
