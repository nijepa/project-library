let myLibrary = [{title:'The Left Hand of Darkness', author: 'Ursula K. Le Guin', pages: 286, read: "The book is read"}, 
                {title:'Nineteen Eighty-Four', author: 'George Orwell', pages: 328, read: "The book is read"},
                {title:'Brave New World', author: 'Aldous Huxley', pages: 311, read: "The book is read"}, ];

let lastId = 0;

let btnSave = document.getElementById("save");
btnSave.onclick = function() {
  prepareBook();
}

render(myLibrary);

function Book (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function prepareBook() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.querySelector("input[name=read]").checked;
  if (title) {
    console.log(read)
    if (read == true) {
      read = "The book is read";
    } else {
      read = "The book isn't read yet"
    }
    addBookToLibrary(title, author, pages, read);
    let newArr = [];
    newArr.push(myLibrary[myLibrary.length - 1]);
    render(newArr);
  } else {
    alert('oops * Book need title *');
  } 
  modal.style.display = "none";
}

function render(library) {
  let i = lastId;
  library.forEach(resultArray => {
  
    i++;

    let card = document.createElement('div'); // create new div
    card.classList.add('card');

    let name = document.createElement('h4');
    name.innerHTML = '<span>Title : </span>' + resultArray.title;
    card.appendChild(name);

    let description = document.createElement('p');
    description.innerHTML = '<span>Author : </span>' + resultArray.author;
    card.appendChild(description);

    let date = document.createElement('p');
    date.innerHTML = '<span>Nr. of pages : </span>' + resultArray.pages;
    card.appendChild(date);

    let read = document.createElement('button');
    read.innerHTML = resultArray.read;
    read.setAttribute("id", "read")
    card.appendChild(read);

    let del = document.createElement('button');
    del.classList.add('remove');
    del.innerText = 'remove';
    del.setAttribute("id", "delete");
    card.appendChild(del);

    del.setAttribute('data-item-index', i);
    read.setAttribute('data-item-index', i);

    del.addEventListener('click', function() {
        let itemIndex = del.getAttribute('data-item-index');
        myLibrary.splice(itemIndex - 1, 1);
        container.innerHTML = ""
        lastId = 0;
        render(myLibrary)
    })

    read.addEventListener('click', function() {
      let itemIndex = read.getAttribute('data-item-index');
      if(myLibrary[itemIndex-1].read == "The book isn't read yet"){
        myLibrary[itemIndex-1].read = "The book is read";
      } else {
        myLibrary[itemIndex-1].read = "The book isn't read yet";
      }
      read.innerText = resultArray.read;
    })

    let container = document.querySelector(".books");
    container.appendChild(card);
  });
  lastId = i;
  console.log(myLibrary)
}


let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];
let btnCancel = document.getElementById("cancel");

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

btnCancel.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
