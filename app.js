//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
//Event Listener
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("change",filterTodo)
document.addEventListener("DOMContentLoaded",getTodos)
//Functions
function addTodo(event) {
  event.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  saveLocalTodos(todoInput.value)
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //checkmark button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = "<i  class='fa fa-check'></i>";
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);
  //edit btn
  const editButton = document.createElement("button");
  editButton.innerHTML = "<i class='fa fa-edit'></i>"
  editButton.classList.add("edit-btn");
  todoDiv.appendChild(editButton);
  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i  class='fa fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  
  //append to list
  todoList.appendChild(todoDiv);
  todoInput.value = '';

}

function deleteCheck(e){

  const item = e.target
  if(item.classList == 'edit-btn'){
    let editItem = item.parentElement.childNodes[0].innerHTML;
    let itemInput = document.createElement('input');
    itemInput.type = 'text';
    itemInput.value = editItem;
    itemInput.classList.add('edit');
    itemInput.style.cssText = 'box-sizing:border-box;border:none;outline:none;font-size:1.4rem;padding-left:5px;font-family:Poppins'
    
    itemInput.addEventListener('keypress',saveItem);
    itemInput.addEventListener('click',saveItem);
    item.parentElement.childNodes[0].replaceWith(itemInput);
    item.parentElement.childNodes[0].display = 'block'
    itemInput.select();
  }
  if(item.classList == 'trash-btn'){
    const todo = item.parentElement;
    todo.classList.add('fall');
      removeLocalTodos(todo)
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

function saveLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos') == null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(){
  let todos;
  if(localStorage.getItem('todos') == null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach(function(todo){
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todo;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //checkmark button
  const completeButton = document.createElement("button");
  completeButton.innerHTML = "<i  class='fa fa-check'></i>";
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);
  const editButton = document.createElement("button");
  editButton.innerHTML = "<i class='fa fa-edit'></i>"
  editButton.classList.add("edit-btn");
  todoDiv.appendChild(editButton);
  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i  class='fa fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //append to list
  todoList.appendChild(todoDiv);
  })
}
var accesstodo  = {}
function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos') == null){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }
    accesstodo.todo = todos;

  let todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function saveItem(event){ 
  let inputValue = event.target.value;
  if(event.target.value.length > 0 && (event.keyCode === 13)){
    let li = document.createElement('li');
    li.textContent = event.target.value;
    event.target.parentElement.childNodes[0].replaceWith(li);
    event.target.remove();
  }
}  
