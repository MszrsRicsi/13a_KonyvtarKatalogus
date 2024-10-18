const ServerUrl = "http://localhost:3000";

var xhr = new XMLHttpRequest();
/*xhr.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   document.getElementById("demo").innerHTML = this.responseText;
  }
};*/
xhr.open("GET", `${ServerUrl}/books`, true);
xhr.send();