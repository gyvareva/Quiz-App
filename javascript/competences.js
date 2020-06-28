const LOCAL_STORAGE_KEY = "todosArray";
var arrayTodos = [];

function init(){
  initData();
  displayData();
  addEnterKeyEvent();
  
}

function addEnterKeyEvent(){
  var inputElement = document.getElementById("todoInput");
  inputElement.addEventListener("keyup", function(event){
    if (event.keyCode === 13) {
      addTodo();
    };
  });
}

function initData(){
  arrayTodos = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY));
  
  if(arrayTodos == null){
    arrayTodos = [];
    arrayTodos.push({id:"id01", todoText:"Spirométrie", isComplete: false});
    arrayTodos.push({id:"id02", todoText:"Gaz du sang", isComplete: true});
    arrayTodos.push({id:"id03", todoText:"Aérosols", isComplete: false});
    persistData();
  }
  console.log("Data initialized");
}

function persistData() {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(arrayTodos));
  console.log(arrayTodos);
  console.log("Data persisted to local storage");
}

function displayData () {

  clearTodosDisplay();

  var myList = document.getElementById("myUl");
  arrayTodos.forEach(todo => {
    var newLi = document.createElement("LI");
    newLi.id = todo.id;
    newLi.innerText = todo.todoText;
    
    if(todo.isComplete){
      newLi.classList.add("checked");
    }

    newLi.addEventListener("click", toggleTodo);

    var boutonEffacer = document.createElement("SPAN");
    boutonEffacer.classList.add("close");
    boutonEffacer.appendChild(document.createTextNode("\u00D7"));
    boutonEffacer.addEventListener("click", deleteTodo);
    boutonEffacer.id = "deleted_" + todo.id;
    newLi.appendChild(boutonEffacer);

    myList.appendChild(newLi);
  });
}

function deleteTodo(h){
  var currentTodo = h.target;
  var currentTodoId = currentTodo.id.replace("deleted_", ""); // parseInt("1") -> 1

  var tableauQuavecLesId = arrayTodos.map(function(t) { return t.id.toString(); }); 
  // tableaQuavecLesId = ["id01", 1234564787, 126454985]
  var todoIndexToRemove = tableauQuavecLesId.indexOf(currentTodoId);
  console.table(arrayTodos);
  if(todoIndexToRemove == -1){
    console.error("Erreur d'index : -1. currentTodo.id = " + currentTodo.id);
    console.table(arrayTodos);
  }else{
    arrayTodos.splice(todoIndexToRemove, 1);
  }

  persistData();
  displayData();

}

function clearTodosDisplay(){
  var myList = document.getElementById("myUl");

  while(myList.firstChild){
    myList.removeChild(myList.firstChild);
  }

}

function toggleTodo(e){
  var idTodo = e.target.id;

  arrayTodos.forEach( todoExistants => {
      if(todoExistants.id == idTodo){
          todoExistants.isComplete = !todoExistants.isComplete;
      }
  });
  persistData();
  displayData();
}

function addTodo(){
  var inputElement = document.getElementById("todoInput");

  if(inputElement.value == ""){
    return;
  }

    var newTodo = {
      id: Date.now(),
      todoText: inputElement.value,
      isComplete: false
    };
    arrayTodos.push(newTodo);
    inputElement.value = "";
    inputElement.focus();
  
    
    persistData();
    displayData();

}; 
    
    
// // Set up local Storage and retrieve existent local storage upon loading page if needed :
// var itemsArray = [...document.getElementsByTagName('li')];
// var itemsClassArray = [...document.getElementsByClassName('checked')];

// localStorage.setItem('items', JSON.stringify(itemsArray));
// localStorage.setItem('itemClasses', JSON.stringify(itemsClassArray));

// if (localStorage.getItem('items')) {
//   items = JSON.parse(localStorage.getItem('items'))
// } else {
//   items = [...document.getElementsByTagName('li')]
// }

// if (localStorage.getItem('itemClasses')) {
//   items = JSON.parse(localStorage.getItem('itemClasses'))
// } else {
//   items = [...document.getElementsByClassName('checked')]
// }

// console.log(itemsArray);
// console.log(itemsClassArray);



// // Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   myNodelist[i].appendChild(span);
// }

// // Click on a close button to hide the current list item
// var close = document.getElementsByClassName("close");
// var j;
// for (j = 0; j < close.length; j++) {
//   close[j].onclick = function() {
//     var div = this.parentElement;
//     div.style.display = "none";
//   }
// }


// // Add a "checked" symbol when clicking on a list item ; add the class change to localstorage
// var list = document.querySelector('ul');
// console.log(list);
// list.addEventListener('click', function(ev) {
//   if (ev.target.tagName === 'LI') {
//     ev.target.classList.toggle("checked");
//     ev.target = itemsClassArray.push;
//     localStorage.setItem('itemClasses', JSON.stringify(itemsClassArray));
//   }
// }, false);

// // Create a new list item when clicking on the "Add" button
// function nouvelObjectif() {
//   var li = document.createElement("li");
//   var inputValue = document.getElementById("toDoInput").value;
//   var t = document.createTextNode(inputValue);
//   li.appendChild(t);
//   if (inputValue === '') {
//     alert("You must write something!");
//   } else {
//     document.getElementById("myUl").appendChild(li);
//   }
//   document.getElementById("toDoInput").value = "";

//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   li.appendChild(span);

//   for (k = 0; k < close.length; k++) {
//     close[k].onclick = function() {
//       var div = this.parentElement;
//       div.style.display = "none";
//     }
//   }
// } 