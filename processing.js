var total = 0;
var current = 0;
function loadcounter() {
   const per = Math.round((current / total) * 100);
   document.getElementById("counter").innerHTML = current.toString() + "/" + total.toString() + " books (" + per + "%)"
}
function activate(id) {
   if (document.getElementById(id).checked == true){
      current += 1;
      loadcounter();
      localStorage.setItem(id, true)
   } else {
      current -= 1;
      loadcounter();
      localStorage.setItem(id, false)
   }
}
function changetheme() {
   const currenttheme = localStorage.getItem("theme");
   if (currenttheme == "dark") {
      localStorage.setItem("theme", "light")
      const allElements = document.querySelectorAll('*')
      allElements.forEach(element => {
         element.style.color = "black"; 
      });
      document.body.style.backgroundColor = "white"
      document.getElementById("theme").style.color = 'rgb(64, 64, 255)';
   } else {
      localStorage.setItem("theme", "dark")
      const allElements = document.querySelectorAll('*')
      allElements.forEach(element => {
         element.style.color = "white"; 
      });
      document.body.style.backgroundColor = "black"
      document.getElementById("theme").style.color = 'rgb(64, 64, 255)';
   }
}
async function load() {
   const currenttheme = localStorage.getItem("theme");
   if (currenttheme == "dark") {
      const allElements = document.querySelectorAll('*')
      allElements.forEach(element => {
         element.style.color = "white"; 
      });
      document.body.style.backgroundColor = "black"
      document.getElementById("theme").style.color = 'rgb(64, 64, 255)';
   } else {
      const allElements = document.querySelectorAll('*')
      allElements.forEach(element => {
         element.style.color = "black"; 
      });
      document.body.style.backgroundColor = "white"
      document.getElementById("theme").style.color = 'rgb(64, 64, 255)';
   }
   let id = 0;
   const res = await fetch('./data.json');
   const json = await res.json();
   const serieslength = (json.children.length) - 1;
   for (let s = 0; s <= serieslength; s++) {
      const header = document.createElement("label");
      header.innerHTML = "<h2>[" + json.children[s].name + "]</h2>";
      document.body.appendChild(header);
      const length = await (json.children[s].children.length) - 1;
      for (let i = 0; i <= length; i++) {
         total += 1;
         const checkbox = document.createElement("input");
         const label = document.createElement("label");
         const div = document.createElement("div");
         checkbox.type = "checkbox";
         checkbox.id = id.toString();
         label.innerHTML = "<h3 style='display:inline-block;'>" + json.children[s].children[i].name + "</h3>";
         label.appendChild(checkbox);
         div.appendChild(label);
         header.appendChild(div);
         label.style.display = "inline-block";
         checkbox.style.display = "inline-block";
         if (localStorage.getItem(id) == "true"){
            current += 1;
            checkbox.checked = true;
         }
         checkbox.onclick = function() {
            activate(checkbox.id);
         }
         id += 1;
      }
   }
   loadcounter();
}
document.addEventListener('DOMContentLoaded', load)