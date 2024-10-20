function GetAuthors()
{
    document.querySelector("#authorsTableBody").innerHTML = "";

    xhr.open("GET", `${ServerUrl}/authors`, true);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let authorsTableBody = document.querySelector("#authorsTableBody");
            let numOfAuthors = 0;

            JSON.parse(xhr.responseText).forEach(author => {
                numOfAuthors++;

                let tr = document.createElement("tr");

                let td1 = document.createElement("td");
                let td2 = document.createElement("td");
                let td3 = document.createElement("td");

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
                editBTN.setAttribute("data-bs-target", "#authorsModal");

                editBTN.onclick = () => {EditAuthorPopUp(author)};
                deleteBTN.onclick = () => {DeleteAuthor(author)};
                
                td1.innerHTML = author.name;
                td2.innerHTML = String(author.birth).split('T')[0];
                td3.appendChild(editBTN);
                td3.appendChild(deleteBTN);

                td2.classList.add("text-center");
                td3.classList.add("text-end");

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);

                authorsTableBody.appendChild(tr);
            });

            document.querySelector("#totalAuthorsLabel").innerHTML = `Total: ${numOfAuthors} author(s).`
        }
    };
}

function AddAuthor()
{
    let newAuthor = JSON.stringify({
        name: document.querySelector("#authorName").value,
        birth: document.querySelector("#authorBirthDate").value
    });

    xhr.open("POST", `${ServerUrl}/authors`, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(newAuthor);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            alert(xhr.responseText);
            
            if (xhr.status == 200)
            {
                GetAuthors();
            }
        }
    };

    document.querySelector("#authorName").value = "";
    document.querySelector("#authorBirthDate").value = "";
}

function EditAuthor(author)
{
    let editedAuthorData = JSON.stringify({
        newName: document.querySelector("#authorModalName").value,
        newBirthDate: document.querySelector("#authorModalBirthDate").value
    });

    xhr.open("PATCH", `${ServerUrl}/authors/${author.id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(editedAuthorData);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            alert(xhr.responseText);
            
            if (xhr.status == 200)
            {
                GetAuthors();
            }
        }
    };
}

function EditAuthorPopUp(author)
{
    document.querySelector("#authorsModalLabel").innerHTML = `Editing ${author.name}`;

    document.querySelector("#authorModalName").value = author.name;
    document.querySelector("#authorModalBirthDate").value = String(author.birth).split('T')[0];

    document.querySelector("#authorModalSaveBTN").onclick = () => {EditAuthor(author)};
};

function DeleteAuthor(author)
{
    if (confirm(`Are you sure you want to delete ${author.name}?`))
    {
        xhr.open("DELETE", `${ServerUrl}/authors/${author.id}`, true);
        xhr.send();
    
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                alert(xhr.responseText);
                
                if (xhr.status == 200)
                {
                    GetAuthors();
                }
            }
        };
    }
}