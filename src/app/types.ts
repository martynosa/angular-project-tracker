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

// PROJECT
enum ProjectStatus {
  new = 'new',
  inProgress = 'inProgress',
  completed = 'completed',
}

export interface Project {
  name: string;
  description: string;
  status: ProjectStatus;
}
