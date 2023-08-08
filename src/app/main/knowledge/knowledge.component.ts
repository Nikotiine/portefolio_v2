import { Component } from '@angular/core';
import { KnowledgeCategories } from '../../core/enum/KnowledgeCategories.enum';
import { KnowledgeCard } from '../../core/models/KnowledgeCard.model';

@Component({
  selector: 'app-knowledge',
  templateUrl: './knowledge.component.html',
  styleUrls: ['./knowledge.component.scss'],
})
export class KnowledgeComponent {
  public readonly knowledges: KnowledgeCard[] = [
    {
      name: 'Javascript',
      rating: 4,
      category: KnowledgeCategories.LANGUAGE,
      logo: 'javascript.png',
    },
    {
      name: 'TypeScript',
      rating: 4,
      category: KnowledgeCategories.FRAMEWORK,
      logo: 'typescript.png',
    },
    {
      name: 'Angular',
      rating: 4,
      category: KnowledgeCategories.FRONT_END,
      logo: 'angular.png',
    },
    {
      name: 'NodeJS',
      rating: 4,
      category: KnowledgeCategories.BACK_END,
      logo: 'node.png',
    },
    {
      name: 'Java',
      rating: 2,
      category: KnowledgeCategories.LANGUAGE,
      logo: 'java.png',
    },
    {
      name: 'PHP',
      rating: 3,
      category: KnowledgeCategories.LANGUAGE,
      logo: 'php.png',
    },
    {
      name: 'MySQL',
      rating: 4,
      category: KnowledgeCategories.DATABASE,
      logo: 'mysql.png',
    },
    {
      name: 'Git',
      rating: 4,
      category: KnowledgeCategories.VERSIONING,
      logo: 'git.png',
    },
    {
      name: 'Docker',
      rating: 3,
      category: KnowledgeCategories.VIRTUALIZATION,
      logo: 'docker.png',
    },
    {
      name: 'VueJS',
      rating: 3,
      category: KnowledgeCategories.FRONT_END,
      logo: 'vue.png',
    },

    {
      name: 'Linux',
      rating: 3,
      category: KnowledgeCategories.SERVER,
      logo: 'linux.png',
    },
    {
      name: 'Symfony',
      rating: 4,
      category: KnowledgeCategories.FRAMEWORK,
      logo: 'symfony.png',
    },
  ];
}
