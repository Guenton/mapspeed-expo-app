import type { TripPassengerFormat } from '$lib/types/trip';
import type { UserFormat } from '$lib/types/user';

/** Convert the `UserFormat` into to a `TripPassengerFormat` */
export const convertUserFormatToTripPassengerFormat = (user: UserFormat) => {
  const tripClient: TripPassengerFormat = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    username: user.username,
    email: user.email,
    provider: user.provider,
    confirmed: user.confirmed,
    blocked: user.blocked,
    role: user.role.id,
    address: user.address,
    birth_date: user.birth_date,
    qr_code: user.qr_code,
    last_access: user.last_access,
    created_at: user.created_at,
    updated_at: user.updated_at,
    bricID: user.bricID,
    profile_picture: user.profile_picture,
  };

  return tripClient;
};
