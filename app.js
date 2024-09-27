const myLibrary = [];

const submit = document.querySelector("button[type='button']");
const space = document.querySelector(".partition2 > div")
const display = document.querySelector(".display");
const dialog = document.querySelector("dialog");
const add = document.querySelector("button:first-of-type");
const form = document.querySelector("form");
const dialogClose = document.querySelector("dialog>div");

// Constructor 
function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = this.read === "Yes" ? "No" : "Yes";
}

function addBookToLibrary() {
    const author = document.querySelector("#author").value;
    const title = document.querySelector("#title").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#yes").checked ? "Yes" : "No";
    console.log(read)
    const book = new Book(author, title, pages, read);
    myLibrary.push(book);
    console.log(myLibrary);
}

function displayBooks() {
    for (let item of myLibrary) {
        const card = document.createElement("div");
        const close = document.createElement("div");
        const change = document.createElement("div");
        close.classList.add("card-close");
        change.classList.add("change")
        const author = document.createElement("div");
        const title = document.createElement("div");
        const pages = document.createElement("div");
        const read = document.createElement("div");
        author.textContent = "Author: " + item.author;
        title.textContent = "Title: " + item.title;
        pages.textContent = "Pages: " + item.pages;
        read.textContent = "Read: " + item.read;
        card.appendChild(close);
        card.appendChild(change);
        card.appendChild(author);
        card.appendChild(title);
        card.appendChild(pages);
        card.appendChild(read);
        space.appendChild(card);
        card.addEventListener("click", (e) => {
            if (e.target.className === "card-close") {
                space.removeChild(e.target.parentNode);
                myLibrary.splice(myLibrary.indexOf(item), 1);
            }
        })
        change.addEventListener("click", (e) => {
            item.toggleRead();
            read.textContent = "Read: " + item.read;
        })
    }
}

add.addEventListener("click", () => {
    dialog.showModal();
})

submit.addEventListener("click", (e) => {
    const author = document.querySelector("#author").value;
    const title = document.querySelector("#title").value;
    const pages = document.querySelector("#pages").value;
    if (!(author.trim().length === 0 || title.trim().length === 0 || pages.trim().length === 0)) {
        addBookToLibrary()
        form.reset();
        dialog.close();
        space.innerHTML = "";
        displayBooks();
    }
});

// addEventListener("DOMContentLoaded", () => {
//     dialog.showModal();
// })

dialogClose.addEventListener("click", () => {
    form.reset();
    dialog.close();
})