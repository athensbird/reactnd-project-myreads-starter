import React, { Component } from 'react';

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
              <li>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                    <div className="book-shelf-changer">
                      <select>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors[0]}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
