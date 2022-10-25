//Book Class:
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

//UI class: Handles UI Tasks
  class UI {
    static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
      const list = document.querySelector('#bookList');

      const row = document.createElement('tr');

      const createTitle = document.createElement('th');
      const createAuthor = document.createElement('th');
      createTitle.innerHTML = book.title;
      createAuthor.innerHTML = book.author;
      const removeBtn = document.createElement('button');
      removeBtn.classList.add('remove-btn');
      removeBtn.type = 'submit';
      removeBtn.innerText = 'Remove';

      row.appendChild(createTitle);
      row.appendChild(createAuthor);
      row.appendChild(removeBtn);
      list.appendChild(row);
    }

    static deleteBook(el) {
      if(el.classList.contains('remove-btn')) {
        el.parentElement.remove();
      }
    }

    // <div class="alert alert success">Message</div>

    // static showAlert(message, className) {
    //   const div = document.createElement('div');
    //   div.className = `alert`;
    //   div.appendChild(document.createTextNode(message));
    //   const container = document.querySelector('.container');
    //   const table = document.querySelector('.table');
    //   container.insertBefore(div, table);
    //   // vanishing 2 second
    //   setTimeout(() => document.querySelector('.alert').remove(), 2000);
    // }

    static clearfields() {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
    }
  }

// store classes: handles Storage

class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
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
      if(book.author === author) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// event: display books

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// event: add books
document.querySelector('#enter').addEventListener('submit', (e) => {
// prevent defualt
e.preventDefault();

  //get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  // validation
  if(title === '' || author === '') {
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
  Store.removeBook(e.target.previousElementSibling.textContent);
})



// let libraryList = [];
// const submit = document.querySelector('#submit');
// const list = document.querySelector('#bookList');
// const bookTitle = document.querySelector('#inputTitle');
// const bookAuthor = document.querySelector('#inputAuthor');

// function Book(title, author) {
//   this.title = title;
//   this.author = author;
// }

// function addBookToLibrary() {
//   if (bookTitle.value !== '' && bookAuthor.value !== '') {
//     libraryList.push(new Book(bookTitle.value, bookAuthor.value));
//   } else {
//     list.appendChild();
//   }
// }

// function displayBooks(book) {
//   const row = document.createElement('tr');
//   const createTitle = document.createElement('th');
//   const createAuthor = document.createElement('th');
//   createTitle.innerHTML = book.title;
//   createAuthor.innerHTML = book.author;
//   const removeBtn = document.createElement('button');
//   removeBtn.classList.add('remove-btn');
//   removeBtn.type = 'submit';
//   removeBtn.innerText = 'Remove';

//   row.appendChild(createTitle);
//   row.appendChild(createAuthor);
//   row.appendChild(removeBtn);
//   list.appendChild(row);
// }

// submit.addEventListener('click', (e) => {
//   e.preventDefault();
//   addBookToLibrary();
//   displayBooks(libraryList[libraryList.length - 1]);
//   localStorage.setItem('libraryLists', JSON.stringify(libraryList));
//   bookTitle.value = '';
//   bookAuthor.value = '';
// });

// list.addEventListener('click', (e) => {
//   if (e.target.classList.contains('remove-btn')) {
//     e.target.parentElement.remove();
//     libraryList = libraryList.filter(({ title }) => e.target.parentElement.firstChild.innerText
//     !== title);
//     localStorage.setItem('libraryLists', JSON.stringify(libraryList));
//   }
// });

// if (localStorage.getItem('libraryLists')) {
//   JSON.parse(localStorage.getItem('libraryLists')).forEach((book) => {
//     displayBooks(book);
//     libraryList.push(book);
//   });
// }
