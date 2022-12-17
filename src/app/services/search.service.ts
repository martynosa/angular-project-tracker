import { Project } from '../interfaces';

const searchService = (projects: Project[], input: string) => {
  return projects.filter((p: Project) => {
    if (input !== '') {
      // NAME
      if (p.name.toLowerCase().includes(input.toLowerCase())) {
        return p;
      }

      // DESCRIPTION
      if (p.description.toLowerCase().includes(input.toLowerCase())) {
        return p;
      }

      return null;
    }
    return p;
  });
};

export default searchService;
