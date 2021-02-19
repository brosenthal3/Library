const libraryModule = (function(){
    const libraryArray = [];

    //book class
    Book = class{
        constructor(title, author, pages, read){
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        }
        info(){
            return `${this.title}, written by ${this.author}, ${this.pages} pages.`
        }
        
    }
    const addBook = (title, author, pages, read) => {
        let newBook = new Book(title, author, pages, read);
        libraryArray.push(newBook);
        DOMController.renderPage();
    }
    const removeBook = (id) => {
        libraryArray.splice(id, 1);
        DOMController.renderPage();
    }
    const toggleReadBook = (id) => {
        libraryArray[id].read = libraryArray[id].read ? false : true;
        DOMController.renderPage();
    }

    return {
        libraryArray,
        addBook,
        removeBook,
        toggleReadBook
    }

})();

const DOMController = (function(){
    const renderPage = () => {
        const library = libraryModule.libraryArray;
        showPopup(false);
        let list = document.getElementById('books');
        if(library.length == 0){
            list.innerHTML = `<p class="alert alert-light"><i>There are currently no books in the library.</i></p>`;
        } else{
            list.innerHTML = '';
            library.forEach((book, index) => {
                list.innerHTML += `
                    <div class="card" title="${book.info()}">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">By ${book.author}</h6>
                            <p class="card-text">${book.pages} pages.</p>
                            <button class="toggle-read-btn btn ${book.read ? 'btn-read' : 'btn-unread'}" id="${index}">${book.read ? 'I have read this book' : 'I haven\'t read this book'}</button>
                            <button class="remove-book-btn btn btn-danger" id="${index}">Remove Book</button>
                        </div>
                    </div>
                `
            });
        }
        addButtonEvents();
    }

    const showPopup = (show) => {
        let popup = document.getElementById('new-book-form');
        if(show){
            popup.style.visibility = 'visible';
        }else{
            popup.style.visibility = 'hidden';
        }
    }

    const addButtonEvents = () => {
        document.querySelectorAll(".remove-book-btn").forEach((btn) => {
            btn.addEventListener('click', (e) => {
                libraryModule.removeBook(e.target.id);
            });
        });
        document.querySelectorAll(".toggle-read-btn").forEach((btn) => {
            btn.addEventListener('click', (e) => {
                libraryModule.toggleReadBook(e.target.id);
            });
        });
    }

    const submitNewBook = () => {
        let title = document.getElementById('book-title').value;
        let author = document.getElementById('book-author').value;
        let pages = document.getElementById('book-pages').value;
        let read = document.getElementById('book-read').checked;
        if(title == '' || author == '' || pages == null){
            return;
        }
        resetForm()
        libraryModule.addBook(title, author, pages, read);   
    }

    const resetForm = () => {
        document.getElementById('book-pages').value = null;
        document.getElementById('book-author').value = '';
        document.getElementById('book-title').value = '';
        document.getElementById('book-read').checked = false;
    }

    const bindEvents = () => {
        document.getElementById('add-new-book').addEventListener('click', () => {
            showPopup(true);
        });
        document.getElementById('cancel-new-book').addEventListener('click', () => {
            showPopup(false);
        });
        document.getElementById('submit-new-book').addEventListener('click', submitNewBook);
    }

    bindEvents();
    
    renderPage();

    return {
        renderPage
    }
})();

libraryModule.addBook("Dune", "Frank Herbert", "613", true);
libraryModule.addBook("The Great Gatsby", "F. Scott Fitsgerald", "221", true);
libraryModule.addBook("1984", "George Orwell", "406", false);