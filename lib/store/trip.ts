import { atom } from 'recoil';

import { TripFormat, TripActiveFormat } from '../types/trip';

const initialTripListState: TripFormat[] = [];
const initialSelectedTripState: TripFormat = {} as TripFormat;
const initialActiveTripState: TripActiveFormat = {} as TripActiveFormat;

export const tripListState = atom<TripFormat[]>({
  key: 'tripListState',
  default: initialTripListState,
});

export const selectedTripState = atom<TripFormat>({
  key: 'selectedTripState',
  default: initialSelectedTripState,
});

export const activeTripState = atom<TripActiveFormat>({
  key: 'activeTripState',
  default: initialActiveTripState,
});

export const qrScanState = atom<string>({ key: 'qrScanState', default: '' });
