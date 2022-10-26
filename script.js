// Book Class:
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// store classes: handles Storage

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(author) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.author === author) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// UI class: Handles UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#bookList');

    const row = document.createElement('tr');
    row.classList.add('row');

    const createTitle = document.createElement('th');
    const createAuthor = document.createElement('th');
    createTitle.innerHTML = book.title;
    createAuthor.innerHTML = book.author;
    const createButton = document.createElement('th');
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.type = 'submit';
    removeBtn.innerText = 'Remove';
    createButton.appendChild(removeBtn);

    row.appendChild(createTitle);
    row.appendChild(createAuthor);
    row.appendChild(createButton);
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('remove-btn')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearfields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

// event: display books

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// event: add books
document.querySelector('#enter').addEventListener('submit', (e) => {
// prevent defualt
  e.preventDefault();

  // get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  // validation
  if (title === '' || author === '') {
    alert('Please fill in all fields');
  } else {
    // instatiate book
    const book = new Book(title, author);
    // Add book to UI
    UI.addBookToList(book);

    // add book to store
    Store.addBook(book);

    // clear field
    UI.clearfields();
  }
});

// event: remove a books
document.querySelector('#bookList').addEventListener('click', (e) => {
  // remove book from UI
  UI.deleteBook(e.target);

  // remove books form store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});