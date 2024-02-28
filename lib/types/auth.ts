/** AUTH - Authenticated User Format */
export type AuthUserFormat = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: {
    id: number;
    name: string;
    description: string;
    type: string;
    admin: string;
  };
  address: string;
  birth_date: string;
  qr_code: string;
  last_access: string;
  created_at: string;
  updated_at: string;
  bricID: string;
  profile_picture: string;
  audit_trails: [];
  trips: [];
};

/** AUTH - Login Format */
export type AuthLoginFormat = {
  identifier: string;
  password: string;
};

/** AUTH - Reset Format */
export type AuthResetFormat = {
  code: string;
  password: string;
  passwordConfirmation: string;
};

/** AUTH - Login Response Format */
export type AuthLoginResponseFormat = {
  jwt: 'string';
  user: AuthUserFormat;
};
