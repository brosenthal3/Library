//library array of all the books
let library = [];

//book constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
Book.prototype.info = function(){
    return `${this.title}, written by ${this.author}, ${this.pages} pages.`
}

function addBook(title, author, pages, read){
    let newBook = new Book(title, author, pages, read);
    library.push(newBook);
}
function removeBook(id){
    library.splice(id, 1);
    renderPage();
}
function toggleReadBook(id){
    library[id].read = library[id].read ? false : true;
    renderPage();
}

function renderPage(){
    showPopup(false);
    let list = document.getElementById('books');
    list.innerHTML = '';
    library.forEach((book, index) => {
        list.innerHTML += `
            <li class="list-group-item">${book.info()} 
                <div>
                    <button class="toggle-read-btn btn ${book.read ? 'btn-info' : 'btn-warning'}" id="${index}">${book.read ? 'Have read' : 'Not read'}</button>
                    <button class="remove-book-btn btn btn-danger" id="${index}">Remove Book</button>
                </div>
            </li>
        `
    });
    addButtonEvents();
}

document.getElementById('add-new-book').addEventListener('click', () => {
    showPopup(true);
});
document.getElementById('cancel-new-book').addEventListener('click', () => {
    showPopup(false);
});
document.getElementById('submit-new-book').addEventListener('click', () => {
    let title = document.getElementById('book-title').value;
    let author = document.getElementById('book-author').value;
    let pages = document.getElementById('book-pages').value;
    let read = document.getElementById('book-read').checked;
    document.getElementById('book-pages').value = null;
    document.getElementById('book-author').value = '';
    document.getElementById('book-title').value = '';
    document.getElementById('book-read').checked = false;
    addBook(title, author, pages, read);
    renderPage();
});

function addButtonEvents(){
    document.querySelectorAll(".remove-book-btn").forEach((btn) => {
        btn.addEventListener('click', (e) => {
            removeBook(e.target.id);
        });
    });
    document.querySelectorAll(".toggle-read-btn").forEach((btn) => {
        btn.addEventListener('click', (e) => {
            toggleReadBook(e.target.id);
        });
    });
}


function showPopup(show){
    let popup = document.getElementById('new-book-form');
    if(show){
        popup.style.visibility = 'visible';
    }else{
        popup.style.visibility = 'hidden';
    }
}

renderPage();