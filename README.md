# 05 API Taskboard

## User Story
```
AS A project team member with multiple tasks to organize
I WANT a task board 
SO THAT I can add individual project tasks, manage their state of progress and track overall project progress accordingly
```
## Acceptance Criteria
This website follows the acceptance criteria of:
```
GIVEN a task board to manage a project
WHEN I open the task board
THEN the list of project tasks is displayed in columns representing the task progress state (Not Yet Started, In Progress, Completed)
WHEN I view the task board for the project
THEN each task is color coded to indicate whether it is nearing the deadline (yellow) or is overdue (red)
WHEN I click on the button to define a new task
THEN I can enter the title, description and deadline date for the new task into a modal dialog
WHEN I click the save button for that task
THEN the properties for that task are saved in localStorage
WHEN I drag a task to a different progress column
THEN the task's progress state is updated accordingly and will stay in the new column after refreshing
WHEN I click the delete button for a task
THEN the task is removed from the task board and will not be added back after refreshing
WHEN I refresh the page
THEN the saved tasks persist
```

## Description
For this assignment I began with starter code and utilized day.js for dates to create a task manager board. This allows a user to add a task through a prompt which is then added
in the to do column, with in progress and done as the others. Once the task is added to the board, it can be removed, dragged and dropped, and is color coded based on priority level
and status

## Deployment

The following link leads to the website:
https://mayachakravarty.com/API-task-board-hw5/

## Screenshots

Here are screenshots of the website:
<img width="1384" alt="Screenshot 2024-03-18 at 6 06 04 PM" src="https://github.com/mayachakra/API-task-board-hw5/assets/100816867/65978c3e-47d9-4d98-a155-c763f9b20e42">



