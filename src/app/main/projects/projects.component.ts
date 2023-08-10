import { Component } from '@angular/core';
import { ProjectCard } from '../../core/models/ProjectCard.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  public projects: ProjectCard[] = [
    {
      name: 'Genesis MetaHomeopathie',
      type: 'website',
      logo: 'meta.png',
      description: 'metaDescription',
      techno: 'VueJs / NodeJs / Bulma',
      website: [
        {
          label: 'Site web',
          link: 'https://metahomeopathie.fr/',
        },
      ],
    },
    {
      name: 'Une Voie Une Croix',
      type: 'sideProject',
      logo: 'climbing.png',
      description: 'oneRouteDescription',
      techno: 'Angular / NestJs / PrimeNg / MySql',
      website: [
        {
          label: 'Repo Git-Hub Front-end',
          link: 'https://github.com/Nikotiine/App_une_voie_une_croix',
        },
        {
          label: 'Repo Git-Hub Back-end',
          link: 'https://github.com/Nikotiine/Api_une_voie_une_croix',
        },
      ],
    },
    {
      name: 'Carnet de montagne',
      type: 'sideProject',
      logo: 'hiking.png',
      description: 'carnetDescription',
      techno: 'PHP 8/ Symphony 6/ Bootstrap / MySql',
      website: [
        {
          label: 'Repo Git-Hub WebApp',
          link: 'https://github.com/Nikotiine/Carnet_de_montagne',
        },
      ],
    },
    {
      name: 'ENI Sortir',
      type: 'schoolProject',
      logo: 'enisortir.png',
      description: 'eniSortirDescription',
      techno: 'PHP 8/ Symphony 5/ Bootstrap / MySql / Git',
      website: [
        {
          label: 'Repo Git-Hub WebApp',
          link: 'https://github.com/Nikotiine/EniSortir',
        },
      ],
    },
    {
      name: 'ENI Enchere',
      type: 'schoolProject',
      logo: 'enienchere.png',
      description: 'eniEnchere',
      techno: 'JAVA EE (JDK 17) / JSTL / Bulma / Git',
      website: [
        {
          label: 'Repo Git-Hub WebApp',
          link: 'https://github.com/Nikotiine/ENI_Encheres',
        },
      ],
    },
    {
      name: 'GitLab Thinker-bell',
      type: 'website',
      logo: 'tinkerbell.png',
      description: 'twsDescription',
      techno: 'GitLab CE / Docker / Apache / Debian',
      website: [
        {
          label: 'Site Web',
          link: 'https://gitlab-tinkerbell.eu/users/sign_in',
        },
      ],
    },
  ];
}
