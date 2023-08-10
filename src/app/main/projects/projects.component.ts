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
      description:
        'Site vitrine pour la presention de la metahomepathie,technique et laboratoire. La pièce manquante entre l’Homéopathie Hahnemannienne et les sciences quantiques modernes : La MetaHomeopathie',
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
      description:
        'Site desitine aux grimpeur, permet de retrouver un site de grimpe et de marquer les voies effecuter avec statistiques',
      techno: 'Angular / NestJs / PrimeNg / MySql',
      website: [
        {
          label: 'Repo Front-end',
          link: 'https://github.com/Nikotiine/App_une_voie_une_croix',
        },
        {
          label: 'Repo Back-end',
          link: 'https://github.com/Nikotiine/Api_une_voie_une_croix',
        },
      ],
    },
    {
      name: 'Carnet de montagne',
      type: 'sideProject',
      logo: 'hiking.png',
      description:
        'Application carnet de note pour sortie montagne. Randonne / Grandes voies / Alpinisme. Statistique de sortie entre utilisateur et like de sortie',
      techno: 'PHP 8/ Symphony 6/ Bootstrap / MySql',
      website: [
        {
          label: 'Repo WebApp',
          link: 'https://github.com/Nikotiine/Carnet_de_montagne',
        },
      ],
    },
    {
      name: 'ENI Sortir',
      type: 'schoolProject',
      logo: 'enisortir.png',
      description: "Site OVS Like , fait en projet de groupe avec l'ENI",
      techno: 'PHP 8/ Symphony 5/ Bootstrap / MySql',
      website: [
        {
          label: 'Repo WebApp',
          link: 'https://github.com/Nikotiine/EniSortir',
        },
      ],
    },
    {
      name: 'ENI Enchere',
      type: 'schoolProject',
      logo: 'enienchere.png',
      description: "Le Bon coin like ,  fait en projet de groupe avec l'ENI",
      techno: 'JAVA EE (JDK 17) / JSTL / Bulma',
      website: [
        {
          label: 'Repo WebApp',
          link: 'https://github.com/Nikotiine/ENI_Encheres',
        },
      ],
    },
    {
      name: 'GitLab Thinker-bell',
      type: 'website',
      logo: 'tinkerbell.png',
      description:
        "Mise en production d'une instance gitlab pour un developeur web independant",
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
