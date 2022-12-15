// USER
export interface User {
  id: string;
  email: string;
  name: string;
  photo: string;
  token: string;
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
