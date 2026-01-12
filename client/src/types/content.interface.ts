export interface IContent {
  id: number;
  title: string;
  description: string;
  metadata: string;
  files?: string | null;
  localisation?: string | null;
  version: number;
  isRegional: boolean;
}
