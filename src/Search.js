import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

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
    this.setState({query: query})
    BooksAPI.search(query, 20)
      .then(books => {
        this.setState({ books });
      });
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
          <div className="search-books-results">
            <ol className="books-grid">
              {books && books.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : null})`}}></div>
                      <div className="book-shelf-changer">
                        <select value={book.shelf ? book.shelf : "none"} onChange={(e) => this.props.handleShelf(book, e.target.value)}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors ? book.authors[0] : book.authors}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
