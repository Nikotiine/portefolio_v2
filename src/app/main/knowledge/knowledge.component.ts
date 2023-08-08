import { Component } from '@angular/core';

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss'],
})
export class KnowledgeComponent {
  public knowledges: any = [
    {
      name: 'Javascript',
      rating: 4,
      category: 'Language',
      logo: 'javascript.png',
    },
    {
      name: 'TypeScript',
      rating: 4,
      category: 'Framework',
      logo: 'typescript.png',
    },
    {
      name: 'Angular',
      rating: 4,
      category: 'Front-end',
      logo: 'angular.png',
    },
    {
      name: 'Node JS',
      rating: 4,
      category: 'Back-end',
      logo: 'node.png',
    },
    {
      name: 'Java',
      rating: 2,
      category: 'Language',
      logo: 'java.png',
    },
    {
      name: 'PHP',
      rating: 3,
      category: 'Language',
      logo: 'php.png',
    },
    {
      name: 'My SQL',
      rating: 4,
      category: 'Database',
      logo: 'mysql.png',
    },
    {
      name: 'GIT',
      rating: 4,
      category: 'Versioning',
      logo: 'git.png',
    },
    {
      name: 'Docker',
      rating: 3,
      category: 'Virtualization',
      logo: 'docker.png',
    },
    {
      name: 'Vue JS',
      rating: 3,
      category: 'Front-end',
      logo: 'vue.png',
    },

    {
      name: 'Linux',
      rating: 3,
      category: 'Server',
      logo: 'linux.png',
    },
    {
      name: 'Symfony',
      rating: 4,
      category: 'Framework',
      logo: 'symfony.png',
    },
  ];
}
