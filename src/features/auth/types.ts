export type User = {
  username: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

// in real world, usually is JWT token or Oauth2 auth
export type LoginResponse = {
  user: {
    username: string;
  };
};
