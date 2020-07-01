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