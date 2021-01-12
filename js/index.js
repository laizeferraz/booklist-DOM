// Initialize a new BookManager with current ID set to 0
let bookManager = new BookManager();

// Load book object from local storage 
if(localStorage.getItem('books')) {
  bookManager.load();
} else {
  bookManager = new BookManager(0);  
};

const newBookForm = document.querySelector('#book-form');

newBookForm.addEventListener('submit', (event)=> {
  event.preventDefault();

  const newBookTitle = document.querySelector('#title');
  const newBookAuthor = document.querySelector('#author');
  const newBookLanguage = document.querySelector('#language');
  const newBookDate = document.querySelector('#date');
  const newBookStatus = document.querySelector('#status')
  const errorMessage = document.querySelector('#alertMessage');

  const title = newBookTitle.value;
  const author = newBookAuthor.value;
  const language = newBookLanguage.value;
  const date = newBookDate.value;
  const status = newBookStatus.value;

  // Validation form
  if(!validFormFieldInput(title)){
    errorMessage.innerHTML = "Please write the book title.";
    errorMessage.style.display = "block";
  }else if (!validFormFieldInput(author)){
    errorMessage.innerHTML = "Please write the author's name.";
    errorMessage.style.display = "block";
  }else if (!validFormFieldInput(language)) {
    errorMessage.innerHTML = "Please put the language the book is writen.";
    errorMessage.style.display = "block";
  }else if (!validFormFieldInput(date)) {
    errorMessage.innerHTML = "Please select the publishing date.";
    errorMessage.style.display = "block";
  }else if (!validFormFieldInput(status)) {
    errorMessage.innerHTML = "Please select the reading status.";
    errorMessage.style.display = "block";
  }else {
    errorMessage.style.display = "none";
    // Add the new book to the book manager
    bookManager.addBook(title, author, language, date, status);
    // Save object in local storage
    bookManager.save()
    // Clear the form after submiting it correctly
    event.target.reset();
  };

});

const validFormFieldInput = (data) => data !== null && data !== '';

const changeToRead = (button, id) => {
  // Find the book id that matches the parent id
     const book = bookManager.books.find(book => book.id === id);
     book.status = 'Read';
     bookManager.save();
     const parentBook = button.parentElement;
    //  If statement to garantee the changes on the UI matches the array of books
      const badge = parentBook.getElementsByClassName('badge-status');
        badge[0].classList.remove('badge-danger');
        badge[0].classList.remove('badge-warning');
        badge[0].classList.add('badge-success');/*  */
        badge[0].innerHTML = `Read`;
        button.remove();   
}

const changeToReading = (button, id) =>{
// Find the book id that matches the parent id
const book = bookManager.books.find(book => book.id === id);
book.status = 'Reading';
bookManager.save();
const parentBook = button.parentElement;

//  If statement to garantee the changes on the UI matches the array of books
 const badge = parentBook.getElementsByClassName('badge-status');
   badge[0].classList.remove('badge-danger');
   badge[0].classList.add('badge-warning');
   badge[0].innerHTML = `Reading`;
   button.remove();
}



