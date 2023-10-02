import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Author } from 'app/modules/book/interfaces/Author';
import { Book } from 'app/modules/book/interfaces/Book';

export const selectAuthors = createFeatureSelector<Array<Author>>('authors');

export const selectBookState = createFeatureSelector<Array<Book>>('collection');

export const selectSimilarBook = createSelector(selectAuthors, selectBookState, (authors, collection) => {
  let authorIds = authors.map(author => author.id);
  return collection.filter((book) => book.volumeInfo.authors.some(author => authorIds.includes(author.id)));
});
