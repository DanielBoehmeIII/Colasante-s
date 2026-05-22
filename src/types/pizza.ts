export type PageId = 'home' | 'services' | 'about' | 'contact';

export type ServiceSlug =
  | 'tree-removal'
  | 'storm-cleanup'
  | 'stump-grinding'
  | 'tree-pruning'
  | 'land-clearing'
  | 'landscaping';

export interface ServiceAreaData {
  slug: string;
  name: string;
  region: string;
}
