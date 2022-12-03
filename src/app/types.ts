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

export interface project {
  title: String;
  description: String;
}
