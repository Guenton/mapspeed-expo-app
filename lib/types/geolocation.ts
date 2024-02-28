/** GEOLOCATION - Format for Geometry */
export type GeometryFormat = {
  location: {
    lat: number;
    lng: number;
  };
  viewport: {
    east: number;
    west: number;
    north: number;
    south: number;
  };
};
