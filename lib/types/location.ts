import type { GeometryFormat } from './geolocation';
import type { UserPictureFormat } from './user';

/** LOCATION - Enum for Location List Filter Options */
export type LocationFilter = 'all' | 'fap' | 'establishment';

/** LOCATION - Format for Locations */
export type LocationFormat = {
  id: number;
  name: string;
  address: string;
  qr_code: string;
  times_scanned: number;
  latitude: number;
  longitude: number;
  location_admin: LocationAdminFormat;
  published_at: string;
  created_at: string;
  updated_at: string;
  geometry: GeometryFormat;
  fapLocation: boolean;
  isEstablishment: boolean;
};

/** LOCATION - Format for Location Adding */
export type LocationAddFormat = {
  name: string;
  address: string;
  qr_code: string;
  fapLocation: boolean;
  isEstablishment: boolean;
  latitude: number | null;
  longitude: number | null;
  geometry: GeometryFormat | null;
};

/** LOCATION - Format for Location Editing */
export type LocationEditFormat = {
  id: number;
  name: string;
  address: string;
  fapLocation: boolean;
  isEstablishment: boolean;
  latitude: number | null;
  longitude: number | null;
  geometry: GeometryFormat | null;
};

/** LOCATION - Format for Location Administration */
export type LocationAdminFormat = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: number;
  address: string;
  birth_date: string;
  qr_code: string;
  last_access: string;
  created_at: string;
  updated_at: string;
  bricID: string;
  profile_picture: UserPictureFormat;
};

/** LOCATION - Format for Location Tables */
export type LocationTableFormat = LocationTableRowFormat[];

/** LOCATION - Format for Location Table Rows */
export type LocationTableRowFormat = {
  id: number;
  name: string;
  address: string;
  fap: string;
  establishment: string;
};
