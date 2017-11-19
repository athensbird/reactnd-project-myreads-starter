import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends React.Component {
  state = {
    query: '',
    books: []
  }
  componentWillMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }
  updateQuery = (query) => {
    const {favoriteBooks} = this.props;
    this.setState({query: query})
    BooksAPI.search(query, 20)
      .then(books => {
        this.setState({
          books: books.map(b => {
            var target = favoriteBooks.filter(fb => fb.id === b.id);
            if (target[0]) {b.shelf = target[0].shelf}
            return b;
          })
        });
      });
  }
  updateShelf = (book, shelf) => {
    this.setState({
      books: this.state.books.map(b => {
        if (b.id === book.id) {
          b.shelf = shelf;
        }
        return b;
      })
    });
    this.props.handleShelf(book, shelf);
  }
  render() {
    const { books } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Home</Link>
          <div>
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books && books.map((book) => (
              <Book book={book} key={book.id} handleShelf={this.updateShelf} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
