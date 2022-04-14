//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
//Event Listener
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("change",filterTodo)
//Functions
function addTodo(event) {
  event.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  todoInput.value = '';
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //checkmark button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = "<i  class='fa fa-check'></i>";
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);
  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i  class='fa fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //append to list
  todoList.appendChild(todoDiv);

}

function deleteCheck(e){
  const item = e.target
  if(item.classList == 'trash-btn'){
    const todo = item.parentElement;
    todo.classList.add('fall');
    todo.addEventListener('transitionend',function(){
          todo.remove();
    })
  }
  if(item.classList == 'complete-btn'){
    const todo = item.parentElement;
    todo.classList.toggle('completed') 
  }
}


function filterTodo(e){
  const todos = todoList.childNodes
  todos.forEach(function(todo){
    const choice = e.target.value
    switch(choice){
      case "all":
        todo.style.display = "flex"
        break;
      case "completed":
        if(todo.classList.contains('completed')){
          todo.style.display = 'flex';
        }
        else{
          todo.style.display = 'none'
        }
        break;
      case "uncompleted":
        if(!todo.classList.contains('completed')){
          todo.style.display = 'flex';
        }else{
          todo.style.display = 'none'
        }
        break;
    }
  })
}