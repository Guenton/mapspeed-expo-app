import type { LocationFormat } from '$lib/types/location';
import type { TripAddressFormat } from '$lib/types/trip';

/**
 * Searches through the given `locationList` and returns the `id` if it was found, otherwise returns `null`.
 *
 * @param locationName `name` property of a `LocationFormat`
 * @param locationList
 */
export const findLocationIdByNameInLocationList = (
  locationName: string,
  locationList: LocationFormat[],
): number | null => {
  const foundLocation = locationList.find((location) => location.name === locationName);

  if (foundLocation) return foundLocation.id;
  else return null;
};

/**
 * Searches through the given `locationList` and returns null if it was found meaning that the AddressFormat is not needed,
 * otherwise it will return a `TripAddressFormat`
 *
 * @param address an address string or possible `name` property of a `LocationFormat`
 * @param locationList
 */
export const getAddressFormatIfNeeded = (
  address: string,
  locationList: LocationFormat[],
): TripAddressFormat | null => {
  const foundLocation = findLocationIdByNameInLocationList(address, locationList);

  if (foundLocation) return null;

  const addressFormat: TripAddressFormat = {
    address,
    geometry: null,
  };

  return addressFormat;
};
