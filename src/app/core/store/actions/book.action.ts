import { createActionGroup, props } from '@ngrx/store';
import { Book } from 'app/modules/book/interfaces/Book';

export const BooksActions = createActionGroup({
  source: 'Books',
  events: {
    'Add Book': props<{ newBook: Book }>(),
    'Remove Book': props<{ bookId: number }>(),
  },
});

export const BooksApiActions = createActionGroup({
  source: 'Books API',
  events: {
    'Retrieved Book List': props<{ bookIds: Array<number> }>(),
  },
});
