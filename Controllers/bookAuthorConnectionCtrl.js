let connections = "";

function FillSelectOptions()
{
    xhr.open("GET", `${ServerUrl}/authors`, true);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            JSON.parse(xhr.responseText).forEach(author => {
                let option1 = document.createElement("option");
                option1.value = author.id;
                option1.innerHTML = author.name;

                document.querySelector("#connectSelectAuthors").appendChild(option1);

                let option2 = document.createElement("option");
                option2.value = author.id;
                option2.innerHTML = author.name;

                document.querySelector("#connectionsModalName").appendChild(option2);
            });

            xhr.open("GET", `${ServerUrl}/books`, true);
            xhr.send();
        
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    JSON.parse(xhr.responseText).forEach(book => {
                        let option1 = document.createElement("option");
                        option1.value = book.id;
                        option1.innerHTML = book.title;
        
                        document.querySelector("#connectSelectBooks").appendChild(option1);

                        let option2 = document.createElement("option");
                        option2.value = book.id;
                        option2.innerHTML = book.title;
                        document.querySelector("#connectionsModalBook").appendChild(option2);
                    });

                    GetConnections();
                }
            }
        }
    }
}

function CreateAndFilterConnections()
{
    document.querySelector("#connectionsTableBody").innerHTML = "";

    let numOfConnections = 0;

    connections.forEach(connection => {
        if (connection.name.includes(document.querySelector("#filter").value) || connection.title.includes(document.querySelector("#filter").value))
        {
            numOfConnections++;

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
            editBTN.setAttribute("data-bs-target", "#connectionsModal");
    
            editBTN.onclick = () => {EditConnectionPopUp(connection)};
            deleteBTN.onclick = () => {DeleteConnection(connection)};
    
            td1.innerHTML = connection.name;
            td2.innerHTML = connection.title;
            
            td3.appendChild(editBTN);
            td3.appendChild(deleteBTN);
    
            td3.classList.add("text-end");
    
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
    
            connectionsTableBody.appendChild(tr);
        }
    });

    document.querySelector("#totalConnectionsLabel").innerHTML = `Total: ${numOfConnections} connection(s)`;
};

function GetConnections()
{
    xhr.open("GET", `${ServerUrl}/connect`, true);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            connections = JSON.parse(xhr.responseText);

            CreateAndFilterConnections();
        }
    }
}

function ConnectAuthorToBook()
{
    if (document.querySelector("#connectSelectAuthors").selectedIndex == 0 || document.querySelector("#connectSelectBooks").selectedIndex == 0)
    {
        alert("Missing fields!");
        return;
    }

    xhr.open("POST", `${ServerUrl}/connect/${document.querySelector("#connectSelectBooks").value}/authors/${document.querySelector("#connectSelectAuthors").value}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            alert(xhr.responseText);

            if (xhr.status == 200)
            {
                GetConnections();
            }
        }
    };

    document.querySelector("#connectSelectAuthors").selectedIndex = 0;
    document.querySelector("#connectSelectBooks").selectedIndex = 0;
}

function EditConnectionPopUp(connection)
{
    document.querySelector("#connectionsModalLabel").innerHTML = `Editing ${connection.name} - ${connection.title} link`;

    xhr.open("GET", `${ServerUrl}/connect/${connection.id}`, true);
    xhr.send();

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200)
        {
            let connectionModalName = document.querySelector("#connectionsModalName");
            connectionModalName.value = JSON.parse(xhr.responseText)[0].authorID;

            let connectionModalBook = document.querySelector("#connectionsModalBook");
            connectionModalBook.value = JSON.parse(xhr.responseText)[0].bookID;
        }
    }

    document.querySelector("#connectionsModalSaveBTN").onclick = () => {EditConnection(connection)};
}

function EditConnection(connection)
{
    let editedConnectionData = JSON.stringify({
        newAuthorID: document.querySelector("#connectionsModalName").value,
        newBookID: document.querySelector("#connectionsModalBook").value
    });

    xhr.open("PATCH", `${ServerUrl}/connect/${connection.id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.send(editedConnectionData);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            alert(xhr.responseText);
            
            if (xhr.status == 200)
            {
                GetConnections();
            }
        }
    };
}

function DeleteConnection(connection)
{
    if (confirm(`Are you sure you want to delete the ${connection.name} - ${connection.title} connection?`))
    {
        xhr.open("DELETE", `${ServerUrl}/connect/${connection.id}`, true);
        xhr.send();
    
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                alert(xhr.responseText);
                
                if (xhr.status == 200)
                {
                    GetConnections();
                }
            }
        };
    }
}