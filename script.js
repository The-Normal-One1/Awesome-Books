const libraryList = [];
const submit = document.querySelector('#submit');
const list = document.querySelector('#bookList');
const bookTitle = document.querySelector('#inputTitle');
const bookAuthor = document.querySelector('#inputAuthor');

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function addBookToLibrary() {
  if (bookTitle.value !== '' && bookAuthor.value !== '') {
    libraryList.push(new Book(bookTitle.value, bookAuthor.value));
  } else {
    list.appendChild();
  }
}

function displayBooks(book) {
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

submit.addEventListener('click', (e) => {
  e.preventDefault();
  addBookToLibrary();
  displayBooks(libraryList[libraryList.length - 1]);
  localStorage.setItem('libraryLists', JSON.stringify(libraryList));
  bookTitle.value = '';
  bookAuthor.value = '';
});

list.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    e.target.parentElement.remove();
    localStorage.setItem('libraryList', JSON.stringify(libraryList));
  }
});
