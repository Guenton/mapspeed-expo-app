/** VEHICLE - Enum for Vehicle List Filter Options */
export type VehicleFilter = 'all';

/** VEHICLE - Enum for Vehicle Types */
export type VehicleType = 'NORMAL' | 'WHEEL_CHAIR' | 'SPECIAL';

/** VEHICLE - Format for Vehicles */
export type VehicleFormat = {
  id: number;
  vehicle_type: VehicleType;
  description: string | null;
  license_plate: string | null;
  name: string | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

/** VEHICLE - Format for Vehicle Adding */
export type VehicleAddFormat = {
  vehicle_type: VehicleType;
  description: string;
  license_plate: string;
  name: string;
};

/** VEHICLE - Format for Vehicle Editing */
export type VehicleEditFormat = {
  id: number;
  vehicle_type: VehicleType;
  description: string;
  license_plate: string;
  name: string;
};

/** VEHICLE - Format for Vehicle Tables */
export type VehicleTableFormat = VehicleTableRowFormat[];

/** VEHICLE - Format for Vehicle Table Rows */
export type VehicleTableRowFormat = {
  id: number;
  name: string;
  licensePlate: string;
  type: VehicleType;
  description: string;
};
