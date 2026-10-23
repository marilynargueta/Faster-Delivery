export interface LoginPayload {
  email: string;
  password: string;
}

export interface Role {
  id: string;
  name: string;
  imagen: string;
  route: string;
}

export interface UserResponse {
  id: number;
  email: string;
  name: string;
  lastName: string;
  lastaname: string;
  image: string;
  phone: string;
  notification_token: string | null;
  roles: Role[];
}

export interface LoginResponse {
  token: string;
  userResponse: UserResponse;
}


export interface UserRequest {
    name: string;
    lastName: string;
    phone: string;
}

