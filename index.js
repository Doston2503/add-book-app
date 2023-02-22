let books = [];
let addBook = document.querySelector('#addBook');
let bookId = null;


function getBooksList() {
    fetch('https://63ed1806e6ee53bbf590f0f6.mockapi.io/book', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(json => {
            books = json;
            drawBooksList()
        })
}

getBooksList();

function drawBooksList() {
    document.querySelector('#books_list').innerHTML = '';

    books.forEach((item, index) => {
        document.querySelector('#books_list').innerHTML += `
         <div class="col-xl-3 my-3">
           <div class="card">
               <div class="card-header bg-dark text-center text-white">
                   <h4>${item.book_name}</h4>
               </div>
               <div class="card-body">
                   <h6>Author: ${item.author}</h6>
                   <h6>Price: ${item.price} $</h6>
                   <h6>Language: ${item.language}</h6>
               </div>
               <div class="card-footer d-flex justify-content-between">
                   <button class="btn btn-warning" onclick="updateBookInfo(${item.id})">update</button>
                   <button class="btn btn-danger" onclick="deleteBook(${item.id})">delete</button>
               </div>
           </div>
       </div>
        
        `
    })
}


addBook.addEventListener('click', addNewBook);

function addNewBook() {
    let book_name = document.forms['bookForm']['book_name'].value;
    let author = document.forms['bookForm']['author'].value;
    let price = document.forms['bookForm']['price'].value;
    let language = document.forms['bookForm']['language'].value;

    let newBook = {
        book_name,
        author,
        price,
        language
    };

    if (bookId !== null) {
        fetch('https://63ed1806e6ee53bbf590f0f6.mockapi.io/book/'+bookId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
            .then(response => response.json())
            .then(json => {
                getBooksList();
                document.forms['bookForm'].reset();
                bookId=null
            })


    } else {
        fetch('https://63ed1806e6ee53bbf590f0f6.mockapi.io/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
            .then(response => response.json())
            .then(json => {
                getBooksList();
                document.forms['bookForm'].reset()
            })
    }


}

function deleteBook(id) {
    fetch('https://63ed1806e6ee53bbf590f0f6.mockapi.io/book/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(json => {
            getBooksList();
        })
}

function updateBookInfo(id) {
    let bookIndex = books.findIndex(item => item.id == id);
    bookId = id;
    document.forms['bookForm']['book_name'].value = books[bookIndex].book_name;
    document.forms['bookForm']['author'].value = books[bookIndex].author;
    document.forms['bookForm']['price'].value = books[bookIndex].price;
    document.forms['bookForm']['language'].value = books[bookIndex].language
}
