import React, { Component } from 'react';
import Book from './Book';

class Bookshelf extends React.Component {
  render() {
    const { books, shelf, displayText } = this.props;
    let listOfBooks;
    if (books) {
      listOfBooks = books.filter(book => {
        return book.shelf === shelf;
      });
    }
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{displayText}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {listOfBooks && listOfBooks.map((book) => (
              <Book book={book} key={book.id} handleShelf={this.props.handleShelf} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
