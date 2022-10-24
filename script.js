const libraryList = [];
const submit = document.querySelector('#submit');
const list = document.querySelector('#bookList');
const bookTitle = document.querySelector('#inputTitle');
const bookAuthor = document.querySelector('#inputAuthor');
// const bookPages = document.querySelector('#inputPages')
// const readOptions = document.querySelector('select')

// Constructor to create book objects:
function Book(title, author) {
  this.title = title;
  this.author = author;
//   this.remover = remover
}

// New book objects are stored in an array:
function addBookToLibrary() {
  if (bookTitle.value !== '' && bookAuthor.value !== '') {
    libraryList.push(new Book(bookTitle.value, bookAuthor.value));
  } else {
    list.appendChild();
  }
}

// Display book:
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

  // row.innerHTML = `<td>${book.author}<td><td>${book.pages}<td><td>${book.read}<td>`
  // above code I formatting was weird, will try back using this code

  row.appendChild(createTitle);
  row.appendChild(createAuthor);
  row.appendChild(removeBtn);
  //   row.appendChild(createRemove)
  //   row.appendChild(createPages)
  //   row.appendChild(createStatus)
  list.appendChild(row);

  //   createTitle.classList.add('deleteRow')
}

// Event Listeners:
submit.addEventListener('click', (e) => {
  e.preventDefault();
  addBookToLibrary();
  displayBooks(libraryList[libraryList.length - 1]);
  localStorage.setItem('libraryLists', JSON.stringify(libraryList));
  bookTitle.value = '';
  bookAuthor.value = '';
});

// Remove books:
list.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    e.target.parentElement.remove();
    const eachIndex = e.target.parentElement.rowIndex - 1;
    // console.log(eachIndex)
    libraryList.forEach((Book, index) => {
      if (index === eachIndex) {
        libraryList.splice[eachIndex];
      }
    });
    localStorage.setItem('libraryList', JSON.stringify(libraryList));
  }
});