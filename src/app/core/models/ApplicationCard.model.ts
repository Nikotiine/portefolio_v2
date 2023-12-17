import { Fragment, Routing } from '../enum/Routing.enum';

export interface ApplicationCard {
  index: number;
  title: string;
  logo: string;
  routerLink: Routing;
  fragment: Fragment | null;
}
