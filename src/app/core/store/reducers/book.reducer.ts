import { createReducer, on } from '@ngrx/store';
import { Book } from 'app/modules/book/interfaces/Book';
import { BooksActions, BooksApiActions } from '../actions/book.action';

const initialState: Array<Book> = [];

export const booksReducer = createReducer(
  initialState,
  on(BooksApiActions.retrievedBookList, (_state, { bookIds }) => _state.filter((book) => bookIds.includes(book.id))),

  on(BooksActions.removeBook, (_state, { bookId }) => _state.filter((book) => book.id !== bookId)),

  on(BooksActions.addBook, (_state, { newBook }) => {
    if (_state.find((book) => book.id == newBook.id)) 
      return _state;
    return [..._state, newBook];
  }),
);
