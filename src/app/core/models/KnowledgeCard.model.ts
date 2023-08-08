import { KnowledgeCategories } from '../enum/KnowledgeCategories.enum';

export interface KnowledgeCard {
  name: string;
  rating: number;
  category: KnowledgeCategories;
  logo: string;
}
