/*

                TO DO STILL FOR ASSIGNMENT
                - style card elements
                    - style cards based on due date
                -complete other functions to:
                    -delete a task
                    -drop a task to a new container
                        -maybe make it change color
                        (check with README requirements)
                    -figure out what the last method does
                    -figure out what the random gen id is for 

*/




// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
/*
function clear(){
    localStorage.clear();

}
clear();
*/

// Todo: create a function to generate a unique task id
function generateTaskId() {
const uniqueID = Math.floor(Math.random()*1000);
return uniqueID;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
   //create a div
   task.id = generateTaskId();
   const taskCard = document.createElement("div");
   taskCard.classList.add("task-card");
   taskCard.dataset.taskId = task.id; //gives unique id?
   taskCard.textContent = `Id: ${task.id} `;

   //color change based on date
   const dueDate = new Date(task.dueDate);
   const currentDate = new Date();
   const timeDiff = dueDate.getTime() - currentDate.getTime();
   const dayDiff = Math.ceil(timeDiff /  (1000*3600*24));
   if(dayDiff < 0){
    taskCard.style.backgroundColor = "#FA5752";
    } else if(dayDiff <= 2){
    taskCard.style.backgroundColor = "#F8F660";
    } else{
        taskCard.style.backgroundColor = "#A9FA52";
    }


   //create button for task action
   const remTaskButton = document.createElement("button");
   remTaskButton.classList.add("rem-task-button");
   remTaskButton.textContent="x";
   remTaskButton.style.backgroundColor = "#D7D6D7";
   remTaskButton.addEventListener("click", function(){
    handleDeleteTask(taskCard);
    //DOES NOT WORK
    localStorage.removeItem(taskCard);   
    //taskCard.remove();
   });

   //create h task title
   const taskTitle = document.createElement("h1");
   taskTitle.classList.add("task-title");
   taskCard.dataset.taskTitle = task.title;
   taskTitle.textContent = `Task: ${task.title} `;
   taskTitle.style.fontFamily = "Times New Roman";
   taskTitle.style.fontSize = "20px";
   taskTitle.style.fontWeight = "bold";


   //create p for description
   const taskDescription = document.createElement("p");
   taskDescription.classList.add("task-description");
   taskCard.dataset.taskDescription = task.description;
   taskDescription.textContent = `Description: ${task.description} `;
   taskDescription.style.fontFamily = "Times New Roman";


   //create datetime for duedate
   const taskDueDate = document.createElement("p");
   taskDueDate.classList.add("task-due-date");
   taskCard.dataset.taskDueDate = task.duedate;
   const formattedDueDate = dayjs(task.dueDate).format('MMMM DD, YYYY');
   taskDueDate.textContent = `Due ${formattedDueDate} `;
   taskDueDate.style.fontFamily = "Times New Roman";

      
    //append elements to task card
    taskCard.appendChild(remTaskButton);
    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskDescription);
    taskCard.appendChild(taskDueDate);

    //return taskCard after button click
    return taskCard;

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
const taskContainer = document.getElementById('todo-cards');
if(!taskContainer){
    console.error("womp womp");
    return;
}
if(!taskList){
    console.error("womp womp womp");
    return;
}
taskContainer.innerHTML='';
taskList.forEach(task =>{
    const taskCard = createTaskCard(task);
    console.log(taskCard);
    taskContainer.appendChild(taskCard);
});

}
window.addEventListener("load",renderTaskList);

// Todo: create a function to handle adding a new task

function handleAddTask(){ //reveal form trigger //hide form w/ x
    const form = document.getElementById('taskForm');
    const title = form.elements['title'].value;
    const description = form.elements['description'].value;
    const dueDate = form.elements['dueDate'].value;
        const task={
            title: title,
            description: description,
            dueDate: dueDate
        };

        //WHEN I ADD THIS IT DOESNT LET ME MOVE THE ELEMENTS
        //WHEN I DONT IT WORKS BUT ADDS PREEXISTING ENTRIES
        //localStorage.removeItem("tasks");

        taskList.push(task);
        localStorage.setItem("tasks",JSON.stringify(taskList));
        const newTaskCard = createTaskCard(task);
        console.log(newTaskCard);
        
        renderTaskList();
    }
    let addNewTask = document.getElementById("add-new-task");
    //const addtaskBTN = document.getElementById("add-task-btn");
    addNewTask.addEventListener("click", handleAddTask);


// Todo: create a function to handle deleting a task
function handleDeleteTask(taskCard){
//event.preventDefault();
if(!taskList){
    console.error("no tasks found");
    return;
}
const taskId = taskCard.dataset.taskId;
taskList = taskList.filter(task => task.id !== taskId);
localStorage.setItem("tasks", JSON.stringify(taskList));
taskCard.remove();
}


//jquery for drag and drop
$(document).ready(function(){
    $(".task-card").draggable({
        revert: "invalid",
        containment: "document",
        helper: "clone",
        zIndex: 100
    });
    $(".lane .card-body").droppable({
        accept: ".task-card",
        drop: function(event, ui){
            handleDrop(event, ui, $(this));
        }
    });
    $(document).on("dragover", function(event){
        event.preventDefault();
    });
});

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui, $container) {
    event.preventDefault();
    const $droppedTask = ui.draggable;
    $container.append($droppedTask);

    //to change background if its in the done column
    const cardBody = $droppedTask.closest('.card-body.bg-light');
    const doneCards = cardBody.find('#done-cards');
    if(doneCards.length > 0){
        $droppedTask.css("background-color", "grey")
    }
    // Append the dropped task to the target status lane
     
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $(".lane .card-body").droppable({
        accept: ".task-card",
        drop: function(event, ui){
            handleDrop(event, ui, $(this));
        }
    });
  
});
