function activate(id) {
   if (document.getElementById(id).checked == true){
      localStorage.setItem(id, true)
   } else {
      localStorage.setItem(id, false)
   }
}
async function load() {
   let id = 0;
   const res = await fetch('./data.json');
   const json = await res.json();
   const serieslength = (json.children.length) - 1;
   for (let s = 0; s <= serieslength; s++) {
      document.getElementById("container").innerHTML += "<h2>[" + json.children[s].name + "]</h3>";
      const length = await (json.children[s].children.length) - 1;
      for (let i = 0; i <= length; i++) {
         console.log(localStorage.getItem(id))
         console.log(id.toString())
         document.getElementById("container").innerHTML += "<h3>" + json.children[s].children[i].name + "</h3><input type='checkbox' onclick='activate(" + id + ")' id=" + id.toString() + ">";
         if (localStorage.getItem(id) == "true"){
            console.log(document.getElementById(id))
            document.getElementById(id.toString()).checked = true;
         }
         if (document.getElementById(id).checked == true){
            console.log("RAHHHH")
         }
         id += 1;
      }
   }
}
document.addEventListener('DOMContentLoaded', load)