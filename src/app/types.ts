export interface User {
  id: string;
  email: string;
  name: string;
  photo: string;
  token: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterUser {
  email: string | null | undefined;
  name: string | null | undefined;
  password: string | null | undefined;
  rePassword: string | null | undefined;
}

export interface project {
  title: String;
  description: String;
}
