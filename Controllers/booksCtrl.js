let books = "";

function GetBooks()
{
    document.querySelector("#booksTableBody").innerHTML = "";

    xhr.open("GET", `${ServerUrl}/books`, true);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let bookTableBody = document.querySelector("#booksTableBody");
            let numOfBooks = 0;

            books = JSON.parse(xhr.responseText);

            JSON.parse(xhr.responseText).forEach(book => {
                numOfBooks++;

                let tr = document.createElement("tr");

                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");
                let td4 = document.createElement("td");

                let editBTN = document.createElement("button");
                let deleteBTN = document.createElement("button");

                let editIcon = document.createElement("i");
                editIcon.setAttribute("class", "bi bi-pencil");

                editBTN.appendChild(editIcon);

                let deleteIcon = document.createElement("i");
                deleteIcon.setAttribute("class", "bi bi-trash");

                deleteBTN.appendChild(deleteIcon);

                editBTN.classList.add("btn", "btn-warning", "me-1");
                deleteBTN.classList.add("btn", "btn-danger");

                editBTN.setAttribute("data-bs-toggle", "modal");
                editBTN.setAttribute("data-bs-target", "#bookModal");

                editBTN.onclick = () => {EditBookPopUp(book)};
                deleteBTN.onclick = () => {DeleteBook(book)};
                
                td1.innerHTML = book.title;
                td2.innerHTML = String(book.releaseDate).split('T')[0];
                td3.innerHTML = book.ISBN;
                td4.appendChild(editBTN);
                td4.appendChild(deleteBTN);

                td2.classList.add("text-center");
                td3.classList.add("text-center");
                td4.classList.add("text-end");

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);

                bookTableBody.appendChild(tr);
            });

            document.querySelector("#totalBooksLabel").innerHTML = `Total: ${numOfBooks} book(s).`;
        }
    };
}

function FilterBooks()
{
    document.querySelector("#booksTableBody").innerHTML = "";

    let numOfBooks = 0;
    books.forEach(book => {
        if (book.title.includes(document.querySelector("#filter").value) || book.releaseDate.includes(document.querySelector("#filter").value) || book.ISBN.includes(document.querySelector("#filter").value))
        {
            let bookTableBody = document.querySelector("#booksTableBody");
            
            numOfBooks++;

            let tr = document.createElement("tr");

            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");

            let editBTN = document.createElement("button");
            let deleteBTN = document.createElement("button");

            let editIcon = document.createElement("i");
            editIcon.setAttribute("class", "bi bi-pencil");

            editBTN.appendChild(editIcon);

            let deleteIcon = document.createElement("i");
            deleteIcon.setAttribute("class", "bi bi-trash");

            deleteBTN.appendChild(deleteIcon);

            editBTN.classList.add("btn", "btn-warning", "me-1");
            deleteBTN.classList.add("btn", "btn-danger");

            editBTN.setAttribute("data-bs-toggle", "modal");
            editBTN.setAttribute("data-bs-target", "#bookModal");

            editBTN.onclick = () => {EditBookPopUp(book)};
            deleteBTN.onclick = () => {DeleteBook(book)};
                
            td1.innerHTML = book.title;
            td2.innerHTML = String(book.releaseDate).split('T')[0];
            td3.innerHTML = book.ISBN;
            td4.appendChild(editBTN);
            td4.appendChild(deleteBTN);

            td2.classList.add("text-center");
            td3.classList.add("text-center");
            td4.classList.add("text-end");

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            bookTableBody.appendChild(tr);
        }});

    document.querySelector("#totalBooksLabel").innerHTML = `Total: ${numOfBooks} book(s).`;
}

function AddBook()
{
    let newBook = JSON.stringify({
        title: document.querySelector("#bookTitle").value,
        releaseDate: document.querySelector("#bookReleaseDate").value,
        isbn: document.querySelector("#bookISBN").value
    });

    xhr.open("POST", `${ServerUrl}/books`, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(newBook);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            alert(xhr.responseText);
            
            if (xhr.status == 200)
            {
                GetBooks();
            }
        }
    };

    document.querySelector("#bookTitle").value = "";
    document.querySelector("#bookReleaseDate").value = "";
    document.querySelector("#bookISBN").value = "";
}

function EditBook(book)
{
    let editedBookData = JSON.stringify({
        newTitle: document.querySelector("#bookModalTitle").value,
        newReleaseDate: document.querySelector("#bookModalReleaseDate").value,
        newIsbn: document.querySelector("#bookModalISBN").value
    });

    xhr.open("PATCH", `${ServerUrl}/books/${book.id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(editedBookData);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            alert(xhr.responseText);
            
            if (xhr.status == 200)
            {
                GetBooks();
            }
        }
    };
}

function EditBookPopUp(book)
{
    document.querySelector("#bookModalLabel").innerHTML = `Editing ${book.title}`;

    document.querySelector("#bookModalTitle").value = book.title;
    document.querySelector("#bookModalReleaseDate").value = String(book.releaseDate).split('T')[0];
    document.querySelector("#bookModalISBN").value = book.ISBN;

    document.querySelector("#bookModalSaveBTN").onclick = () => {EditBook(book)};
};

function DeleteBook(book)
{
    if (confirm(`Are you sure you want to delete ${book.title}?`))
    {
        xhr.open("DELETE", `${ServerUrl}/books/${book.id}`, true);
        xhr.send();
    
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                alert(xhr.responseText);
                
                if (xhr.status == 200)
                {
                    GetBooks();
                }
            }
        };
    }
}