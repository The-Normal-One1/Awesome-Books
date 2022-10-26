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

// for navigation bar
const bookList = document.querySelector('.book-list');
const addList = document.querySelector('.add-book');
const contactList = document.querySelector('.contact-list');

const allSection = document.querySelector('.all');
const inputSection = document.querySelector('#enter');
const contactSection = document.querySelector('.contact');
const copyRight = document.querySelector('.copy-right');
const linksAll = document.querySelector('.list-link');
const linksAdd = document.querySelector('.add-link');
const linksContact = document.querySelector('.contact-link');


bookList.addEventListener('click', (e) => {
  e.preventDefault();
  allSection.style.display = 'flex';
  inputSection.style.display = 'none';
  contactSection.style.display = 'none';
  linksAll.style.color = 'blue';
  linksAdd.style.color = 'black';
  linksContact.style.color = 'black';
});

addList.addEventListener('click', (e) => {
  e.preventDefault();
  allSection.style.display = 'none';
  inputSection.style.display = 'flex';
  contactSection.style.display = 'none';
  linksAdd.style.color = 'blue';
  linksAll.style.color = 'black';
  linksContact.style.color = 'black';
});

contactList.addEventListener('click', (e) => {
  e.preventDefault();
  allSection.style.display = 'none';
  inputSection.style.display = 'none';
  contactSection.style.display = 'flex';
  linksContact.style.color = 'blue';
  linksAdd.style.color = 'black';
  linksAll.style.color = 'black';
});


// timer
const displayDate = () => {
  const date = new Date();
  const options = {
    weekday: undefined,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const [month, time] = [
    date.toLocaleDateString(undefined, options),
    date.toLocaleTimeString().toLocaleLowerCase(),
  ];
  document.querySelector('.time').innerHTML = `${month}, ${time}`;
};
displayDate();
setInterval(displayDate, 1000);
