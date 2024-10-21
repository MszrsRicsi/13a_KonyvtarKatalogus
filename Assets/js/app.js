const ServerUrl = "http://localhost:3000";
var xhr = new XMLHttpRequest();

async function Render(view){
  let main = document.querySelector('main');
  main.innerHTML = await (await fetch(`Views/${view}.html`)).text();

  switch (view)
  {
    case "authors":
      GetAuthors();
      break;
    case "books":
      GetBooks();
      break;
    case "connect":
      FillSelectOptions();
      break;
  }
};

Render("selection");