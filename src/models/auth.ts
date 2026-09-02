export interface UserResponse {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  image: string | null;
  notification_token: string | null;
  roles: {
    id: string;
    name: string;
    image: string;
    route: string;
  }[];
}

export interface LoginResponse {
  token: string;
  userResponse: UserResponse;
}