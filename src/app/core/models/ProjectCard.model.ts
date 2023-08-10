export interface ProjectCard {
  name: string;
  type: string;
  logo: string;
  description: string;
  techno: string;
  website: Website[];
}
interface Website {
  label: string;
  link: string;
}
