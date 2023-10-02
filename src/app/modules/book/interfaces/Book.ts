import { Author } from './Author';

export interface Book {
  id: number;
  volumeInfo: {
    title: string;
    description?: string;
    authors: Array<Author>;
  };
}
