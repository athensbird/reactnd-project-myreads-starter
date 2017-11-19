import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Bookshelf from './Bookshelf';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }
  changeShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(this.updateShelf(shelf));
  }
  updateShelf(shelf) {
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books.map(b => {
          if (b.id === books.id) {
            b.shelf = shelf;
          }
          return b;
        })
      })
    });
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <div className="list-books-title">
              <h1>My Library</h1>
            </div>
            <div className="open-search"><Link to="/search">Search the Library</Link></div>
            <div className="list-books-content">
              <Bookshelf shelf="currentlyReading" books={this.state.books} displayText="Currently Reading" handleShelf={this.changeShelf.bind(this)} />
              <Bookshelf shelf="wantToRead" books={this.state.books} displayText="Want to Read" handleShelf={this.changeShelf.bind(this)} />
              <Bookshelf shelf="read" books={this.state.books} displayText="Read" handleShelf={this.changeShelf.bind(this)} />
            </div>
          </div>
        )} />
        <Route path="/search" render={() => (
          <Search
            handleShelf={this.changeShelf.bind(this)}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp;
