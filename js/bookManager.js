class BookManager {
  // Create a constructor with a parameter currentid set to 0
  constructor(currentId) {
    // Initialize an empty array to save the books added 
    this.books = []; 
    // Set the currentId value to currentId
    this.currentId = currentId || 0;
  }

  /*Add new books */

  // Create a method with an object to add a book
  addBook(title, author, language, date, status) {
    const newBook = {
      id: this.currentId++,
      title,
      author,
      language,
      date,
      status,
    };
    // push the new book into the array 
    this.books.push(newBook);
    
    /*Display list of books*/
   
    // Get the Javascript object new Date, give it the argument newBook.date, and assign it to a variable
    const publishedDate = new Date(newBook.date);
    // Format date to be dd/mm/yyyy
    const formattedDate = publishedDate.getDate() + '/' + (publishedDate.getMonth() + 1) + '/' + publishedDate.getFullYear();

    // Select the empty div from the HTML and assign it to a variable
    const card = document.querySelector('#book-card');
    // Create a new element <ul> in the html file and give it a class
    const list = document.createElement('ul');
    list.className ='list-group';
    // Create an HTML card to display the new book added
    list.innerHTML = `<li id=${newBook.id} class="list-group-item mt-2">
                      <div class="d-flex w-100 mt-2 justify-content-between align-items-center">
                        <h5>${newBook.title}</h5>
                        <button onclick='deleteBook(this, ${newBook.id})' type="button" class="btn delete-icon"></button>
                      </div>
                      <div class="d-flex w-100 mb-3 justify-content-between">
                        <small>Author: ${newBook.author}</small>
                        <small>Language: ${newBook.language}</small>
                      </div>
                      <div class="d-flex w-100 mt-3 justify-content-between align-items-center">
                        <small>Published: ${formattedDate}</small>
                        <span class="badge badge-status ${newBook.status === 'ToRead' ? 'badge-danger' : newBook.status === 'Reading' ? 'badge-warning' : newBook.status === 'Read' ? 'badge-success' : 'badge-primary'}">${newBook.status}</span>
                      </div>
                      <button onclick='changeToRead(this, ${newBook.id})' class="btn btn-outline-success done-button my-3 ${newBook.status === 'ToRead' || newBook.status === 'Reading' ? 'd-inline-block' : 'd-none' }">Mark As Read</button>
                      <button onclick='changeToReading(this, ${newBook.id})' class="btn btn-outline-warning reading-button my-3 ${newBook.status === 'ToRead' ? 'd-inline-block' : 'd-none' }">Mark As Reading</button>
                      </li> 
          `; 
    // Append the new HTML card to the empty div
    card.appendChild(list);
    
  }
  
  save() {
    if(localStorage.getItem('books')) {
      localStorage.removeItem('books')
    }
    const booksJson = JSON.stringify(this.books);
    localStorage.setItem('books', booksJson)
  }

  load() {
   
      const booksString = localStorage.getItem('books');
      const booksJson = JSON.parse(booksString);
      
      booksJson.map(eachBook => {
        const {title, author, language, date, status} = eachBook;
        this.addBook(title, author, language, date, status);
      });
    }
  }

