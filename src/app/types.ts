export interface User {
  id: string;
  email: string;
  name: string;
  photo: string;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string | null | undefined;
  name: string | null | undefined;
  password: string | null | undefined;
  rePassword: string | null | undefined;
}

export interface changePasswordCredentials {
  password: string | null | undefined;
  newPassword: string | null | undefined;
  newRePassword: string | null | undefined;
}

// PROJECT
enum ProjectStatus {
  new = 'new',
  inProgress = 'inProgress',
  completed = 'completed',
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  createdAt: string;
}
