import { router } from 'expo-router';

import {
  // AUTH
  rootPage,
  passwordForgotPage,
  // CLIENT
  clientPage,
  clientTripsPage,
  clientAccountPage,
  // DRIVER
  driverPage,
  driverTripsPage,
  driverAccountPage,
  clientTripsByIdPage,
  driverTripsByIdPage,
  driverQrPage,
} from './pages';

// AUTH
/** Navigate to the Root Page. */
export const gotoRootPage = () => router.replace(rootPage);
/** Navigate to the Password Forgot Page. */
export const gotoPasswordForgotPage = () => router.push(passwordForgotPage);

// CLIENT Root Pages
/** Navigate to the Client Page. */
export const gotoClientPage = () => router.push(clientPage);
/** Navigate to the Client Trip Page. */
export const gotoClientTripPage = () => router.push(clientTripsPage);
/** Navigate to the Client Account Page. */
export const gotoClientAccountPage = () => router.push(clientAccountPage);

// CLIENT Sub Pages
/** Navigate to the Client Trip Page By TripId. */
export const gotoClientTripPageById = (tripId: number | string) =>
  router.push({ pathname: clientTripsByIdPage, params: { id: tripId } });

// DRIVER Root Pages
/** Navigate to the Driver Page. */
export const gotoDriverPage = () => router.push(driverPage);
/** Navigate to the Driver Trip Page. */
export const gotoDriverTripPage = () => router.push(driverTripsPage);
/** Navigate to the Driver Account Page. */
export const gotoDriverAccountPage = () => router.push(driverAccountPage);
/** Navigate to the Driver Qr Page. */
export const gotoDriverQrPage = () => router.push(driverQrPage);

// DRIVER Sub Pages
/** Navigate to the Driver Trip Page By TripId. */
export const gotoDriverTripPageById = (tripId: number | string) =>
  router.push({ pathname: driverTripsByIdPage, params: { id: tripId } });
