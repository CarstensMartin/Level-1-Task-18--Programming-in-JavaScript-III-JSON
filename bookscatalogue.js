//Declare the variable where the book information will be stored.
let bookVar = [];

//See if there is already information captured of books
function myBooks() {
    let htmlSelect = document.getElementById("bookList");
    //The div bottom section should be hidden if there is no information captured yet
    let loadedBefore = document.getElementById("hideOnStart")
    loadedBefore.style.visibility = "hidden";

    //Check if the session storage thisCodeHasRun is NOT created.
    if (sessionStorage.getItem("thisCodeHasRun") === null) {
        //If not created, set the session storage with the 2 names books and thisCodeHasRun.
        sessionStorage.setItem("books", JSON.stringify(bookVar));
        sessionStorage.setItem("thisCodeHasRun", true);
        //If it already exist
    } else {
        //Extract the information from session storage and allocate to the variable bookVar
        bookVar = JSON.parse(sessionStorage.getItem("books"));
        //Create a dropdown list with all the book options that is already captured
        let i = 0;
        bookVar.forEach(function (p) {
            let optItem = document.createElement("option");
            optItem.innerHTML = p.title;
            optItem.value = i;
            i = i + 1;
            htmlSelect.appendChild(optItem);
        });
        //Make the div bottom section visible if a book is already captured
        if (i > 0) {
            loadedBefore.style.visibility = "visible";
        }
    }
}

//Create a drop down list of all the books saved in storage for the dropdown list to choose from which one want to change
function myBooksChange() {
    //declare the variable and identify by id
    let changeSelect = document.getElementById("bookListChange");
    //Extract the book info from session storage
    bookVar = JSON.parse(sessionStorage.getItem("books"));
    //Create a dropdown list
    let i = 0;
    bookVar.forEach(function (p) {
        let optItem = document.createElement("option");
        optItem.innerHTML = p.title;
        optItem.value = i;
        i = i + 1;
        changeSelect.appendChild(optItem);
    });
}

//Declare with the function each of the objects properties
function Book(author, title, genre, price, publishDate, description, review) {
    this.author = author;
    this.title = title;
    this.genre = genre;
    this.price = price;
    this.publishDate = publishDate;
    this.description = description;
    this.review = review;
}

//Add a book using a function
function addBook() {
    //Declare the variable where it needs to get the existing information from storage
    bookVar = JSON.parse(sessionStorage.getItem("books"));
    //Add a new book detail
    let newBook = new Book(
        document.getElementById("author").value,
        document.getElementById("title").value,
        document.getElementById("genre").value,
        document.getElementById("price").value,
        document.getElementById("publishDate").value,
        document.getElementById("description").value,
        document.getElementById("review").value,
    );
    //Push/add the new object into the bookVar array
    bookVar.push(newBook);
    //Convert the JS array back to a string to be stored in books
    sessionStorage.setItem("books", JSON.stringify(bookVar));
}

//Change the details of an existing book
function changeBook() {
    //Find the index of the book that is selected in the dropdown and convert the string into a number
    let indexOfBookObj = Number(document.getElementById("bookListChange").value)
    //Replace the old information with the new information of the object
    bookVar[indexOfBookObj].bio = function () {
        this.author = document.getElementById("authorNew").value;
        this.title = document.getElementById("titleNew").value;
        this.genre = document.getElementById("genreNew").value;
        this.price = document.getElementById("priceNew").value;
        this.publishDate = document.getElementById("publishDateNew").value;
        this.description = document.getElementById("descriptionNew").value;
        this.review = document.getElementById("reviewNew").value;
    };
    bookVar[indexOfBookObj].bio();
    //Convert the JS bookVar into a string to be stored in sessionstorage
    sessionStorage.setItem("books", JSON.stringify(bookVar));
    //Reload the page to show the updated dropdown lists. Function myBooks() to run with reload.
    document.location.reload()
}

//Using DOM - display the information in a paragraph to show the information captured in sessionStorage about a book that is selected to view.
function ChangeActiveUser(indexOfBookObj) {
    bookVar[indexOfBookObj].bio = function () {

        let readBooks = document.getElementById("readBooks");
        readBooks.innerHTML = this.title +
            " is written by " +
            this.author +
            ", this book has a genre of " +
            this.genre +
            ". The publish date was: " +
            this.publishDate +
            " and it is sold for R" +
            this.price +
            ". Book description: " +
            this.description +
            " My personal review: " +
            this.review;
    };
    bookVar[indexOfBookObj].bio();
}