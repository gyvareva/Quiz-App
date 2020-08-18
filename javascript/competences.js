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
    arrayTodos = [
      {id:"id01", todoText:"Physiologie : la cage thoracique", isComplete: false},
      {id:"id02", todoText:"Physiologie : les muscles respiratoires", isComplete: false},
      {id:"id03", todoText:"Physiologie : l'arbre bronchique", isComplete: false},
      {id:"id04", todoText:"Physiologie : les indicateurs", isComplete: false},
      {id:"id05", todoText:"Physiologie : les gaz du sang", isComplete: false},
      {id:"id06", todoText:"Matériel et techniques : les interfaces à O2", isComplete: false},
      {id:"id07", todoText:"Matériel et techniques : les aérosols", isComplete: false},
      {id:"id08", todoText:"Matériel et techniques : cough assist", isComplete: false},
      {id:"id09", todoText:"Matériel et techniques : alpha 300", isComplete: false},
      {id:"id10", todoText:"Matériel et techniques : techniques incitatives", isComplete: false},
      {id:"id11", todoText:"Matériel et techniques : ELPr", isComplete: false},
      {id:"id12", todoText:"Matériel et techniques : ELTGOL", isComplete: false},
      {id:"id13", todoText:"Matériel et techniques : EDIC", isComplete: false},
      {id:"id14", todoText:"Matériel et techniques : AFE", isComplete: false},
      {id:"id15", todoText:"Matériel et techniques : drainage autogène", isComplete: false},
      {id:"id16", todoText:"Matériel et techniques : lutte contre l'atélectasie", isComplete: false},
      {id:"id17", todoText:"Bilan respiratoire", isComplete: false},
      {id:"id18", todoText:"Pathologie : BPCO", isComplete: false},
      {id:"id19", todoText:"Pathologie : DDB", isComplete: false},
      {id:"id20", todoText:"Pathologie : emphysème pulmonaire", isComplete: false},
      {id:"id21", todoText:"Pathologie : atélectasie", isComplete: false},
      {id:"id22", todoText:"Pathologie : maladies neuromusculaires dégénératives", isComplete: false},
      {id:"id23", todoText:"Pathologie : wedge", isComplete: false},
      {id:"id24", todoText:"Pathologie : lobectomie", isComplete: false},
      {id:"id25", todoText:"Pathologie : pneumonectomie", isComplete: false},
      {id:"id26", todoText:"Pathologie : trachéotomie", isComplete: false},
    ];
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