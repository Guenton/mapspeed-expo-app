import type { GeometryFormat } from './geolocation';
import type { TripStatus } from './trip';

/** USER - Enum for User List Filter Options */
export type UserFilter = 'all' | 'clients' | 'drivers' | 'admins';

/** USER - Format for Users */
export type UserFormat = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  username: string;
  email: string | null;
  provider: string | null;
  confirmed: boolean | null;
  blocked: boolean | null;
  role: UserRoleFormat;
  address: string | null;
  birth_date: string | null;
  qr_code: string | null;
  last_access: string | null;
  created_at: string | null;
  updated_at: string | null;
  bricID: string | null;
  profile_picture: UserPictureFormat;
  audit_trails: [];
  trips: UserTripFormat[];
};

/** USER - Format for User Adding */
export type UserAddFormat = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  role: number;
  address: string;
  birth_date: string | null;
  bricID: string;
  qr_code: string;
};

/** USER - Format for User Editing */
export type UserEditFormat = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: number;
  address: string;
  birth_date: string;
  bricID: number | string;
};

/** USER - Format for User Roles */
export type UserRoleFormat = {
  id: number;
  name: string | null;
  description: string | null;
  type: string | null;
  admin: string | null;
};

/** USER - Format for User Pictures */
export type UserPictureFormat = {
  id: number;
  name: string | null;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: {
    small: {
      ext: string | null;
      url: string | null;
      hash: string | null;
      mime: string | null;
      name: string | null;
      path: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    };
    thumbnail: {
      ext: string | null;
      url: string | null;
      hash: string | null;
      mime: string | null;
      name: string | null;
      path: string | null;
      size: number | null;
      width: number | null;
      height: number | null;
    };
  };
  hash: string | null;
  ext: string | null;
  mime: string | null;
  size: number | null;
  url: string | null;
  previewUrl: string | null;
  provider: string | null;
  provider_metadata: string | null;
  created_at: string | null;
  updated_at: string | null;
};

/** USER - Format for User Trips */
export type UserTripFormat = {
  id: number;
  date_time: string | null;
  invoiced: boolean | null;
  driver: number | null;
  destination: number | null;
  origin: number | null;
  passenger_number: number | null;
  status: TripStatus;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  destAddress: string | null;
  destGeometry: GeometryFormat;
  startAddress: string | null;
  startGeometry: GeometryFormat;
  remarks: string | null;
  tripTime: string | null;
  destinationAddress: {
    address: string | null;
    geometry: GeometryFormat;
  };
  originAddress: {
    address: string | null;
    geometry: GeometryFormat;
  };
  isDestinationLocation: boolean | null;
  isOriginLocation: boolean | null;
  vehicle: number | null;
};

/** USER - Format for User Tables */
export type UserTableFormat = UserTableRowFormat[];

/** USER - Format for User Table Rows */
export type UserTableRowFormat = {
  id: number;
  bricId: string;
  username: string;
  name: string;
  address: string;
  blocked: string;
};

/** USER - Format for User Trip Tables */
export type UserTripTableFormat = UserTripTableRowFormat[];

/** USER - Format for User Trip Table Rows */
export type UserTripTableRowFormat = {
  id: number;
  time: string;
  date: string;
  status: string;
  invoiced: string;
};

/** USER - Array Format for a single row of data from the bric Import Excel Sheet */
export type UserBricWorkbookRow = [
  number, // Bric Id
  string | undefined, // First Name
  string | undefined, // Last Name
  string | undefined, // Phone Number
  string | undefined, // Email Address
  number | undefined, // Identification
  string | undefined, // Sport Oefeningen
  string | undefined, // Actief
  string | undefined, // Start Datum
  string | undefined, // Sync With Mobile App
  string | undefined, // Street
  number | undefined, // Created At
];

/** USER - Format for User Bric Table Rows */
export type UserBricTableFormat = UserBricTableRowFormat[];

/** USER - Format for User Bric Table Rows */
export type UserBricTableRowFormat = {
  bricId: string;
  username: string;
  name: string;
  birthDate: string | null;
  address: string;
  email: string;
};
