import type { GeometryFormat } from './geolocation';
import type { UserPictureFormat } from './user';

/** TRIP - Enum for Trip List Filter Options */
export type TripFilter = 'all' | 'completed' | 'pending';

/** TRIP - Enum for Trip Status Options */
export type TripStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';

/** TRIP - Format for Trips */
export type TripFormat = {
  id: number;
  date_time: string | null;
  invoiced: boolean;
  driver: TripDriverFormat;
  destination: TripLocationFormat;
  origin: TripLocationFormat;
  passenger_number: number;
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
  destinationAddress: TripAddressFormat | null;
  originAddress: TripAddressFormat | null;
  isDestinationLocation: boolean;
  isOriginLocation: boolean;
  vehicle: TripVehicleFormat;
  clients: TripPassengerFormat[];
  trip_scans: string | null[];
};

/** TRIP - Format for Trip Adding */
export type TripAddFormat = {
  date_time: string;
  tripTime: string | null;
  invoiced: boolean;
  status: TripStatus;
  driver: number | null;
  origin: number | null;
  destination: number | null;
  destinationAddress: TripAddressFormat | null;
  originAddress: TripAddressFormat | null;
  vehicle: number | null;
  clients: number[];
  remarks: string | null;
  passenger_number: number;
};

/** TRIP - Format for Trip Editing */
export type TripEditFormat = {
  id: number;
  date_time: string;
  tripTime: string | null;
  invoiced: boolean;
  status: TripStatus;
  driver: number | null;
  origin: number | null;
  destination: number | null;
  destinationAddress: TripAddressFormat | null;
  originAddress: TripAddressFormat | null;
  vehicle: number | null;
  clients: number[];
  remarks: string | null;
  passenger_number: number;
};

/** TRIP - Format for Trip Vehicle Driver */
export type TripDriverFormat = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  username: string | null;
  email: string | null;
  provider: string | null;
  confirmed: boolean;
  blocked: boolean;
  role: number;
  address: string | null;
  birth_date: string | null;
  qr_code: string | null;
  last_access: string | null;
  created_at: string | null;
  updated_at: string | null;
  bricID: string | null;
  profile_picture: null;
};

/** TRIP - Format for Trip Locations */
export type TripLocationFormat = {
  id: number;
  name: string | null;
  address: string | null;
  qr_code: string | null;
  times_scanned: number;
  latitude: number;
  longitude: number;
  location_admin: number;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  geometry: GeometryFormat;
  fapLocation: boolean;
  isEstablishment: boolean;
};

/** TRIP - Format for Trip Addresses */
export type TripAddressFormat = {
  address: string | null;
  geometry: GeometryFormat | null;
};

/** TRIP - Format for Trip Vehicles */
export type TripVehicleFormat = {
  id: number;
  vehicle_type: string | null;
  description: string | null;
  license_plate: string | null;
  name: string | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

/** TRIP - Format for Trip Passenger Clients */
export type TripPassengerFormat = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  username: string | null;
  email: string | null;
  provider: string | null;
  confirmed: boolean | null;
  blocked: boolean | null;
  role: number;
  address: string | null;
  birth_date: string | null;
  qr_code: string | null;
  last_access: string | null;
  created_at: string | null;
  updated_at: string | null;
  bricID: string | null;
  profile_picture: UserPictureFormat;
};

/** TRIP - Format for Trip Tables */
export type TripTableFormat = TripTableRowFormat[];

/** TRIP - Format for Trip Table Rows */
export type TripTableRowFormat = {
  id: number;
  date: string;
  time: string;
  origin: string;
  destination: string;
  driver: string;
  status: string;
};

/** TRIP - Format for Currently ongoing Trips */
export type TripActiveFormat = {
  isOngoing: boolean;
  startedAt: Date;
  completedAt?: Date;
  trip: TripFormat;
};
