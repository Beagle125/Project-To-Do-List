import { DMMCreateEditModal, DMMHoverProjectItem, DMMUnhoverProjectItem, 
       DMMClickedProjectItem, DMMCreateProjectItem,  
       DMMOpenEditModal, DMMCloseEditModal, 
       DMMOpenAddModal, DMMCloseAddModal, 
       DMMOpenDeleteModal, DMMCloseDeleteModal,
       DMMDeleteProject, DMMPopulateDashboard,
       DMMCloseTaskModal, DMMTaskCreationModal, DMMCreateTaskItem} from "./domManipulationModule.js";
import { LSMEditProjectName, LSMCreateProject, LSMAddNewProject, LSMDeleteProject, 
        LSMTickTask, LSMCreateTask, LSMAddNewTask} from "./localStorageModule.js";


const EHMDetectEvent = (mainContainer, storage) => {
    const addProjectBtn = document.querySelector('#sidebar .addBtn');
    let isProjectHovered = false;

    // Hover event for each project item using event delegation
    document.addEventListener('mouseover', (event) => {
        const nearestProjectItem = event.target.closest('.projectItem');
        if (nearestProjectItem && !nearestProjectItem.querySelector('.projectItemRight')){
            const projectItem = event.target;
            DMMHoverProjectItem(projectItem);
            isProjectHovered = true;
        }
    });

    // This will serve as the unhover event for the project items
    document.addEventListener('mousemove', (event) => {
        const nearestProjectItem = event.target.closest('.projectItem');
        if (document.querySelector('.projectItemRight'))
            isProjectHovered = true;
        if (isProjectHovered && !event.target.classList.contains('projectContent')){
            let projectItem = nearestProjectItem;
            DMMUnhoverProjectItem(projectItem);
            isProjectHovered = false;
        }
    });
    


    // click events using event delegation
    mainContainer.addEventListener('click', (event) => {
        const nearestProjectItem = event.target.closest('.projectItem');
        const dashboardContainer = document.querySelector('#dashboard');
        const nearestTaskItem = event.target.closest('.taskItem');

        // projectItem select
        if (event.target === nearestProjectItem){
            DMMClickedProjectItem(nearestProjectItem);
            DMMPopulateDashboard(storage, nearestProjectItem.id, dashboardContainer); 
        }      
        // edit Project name
        else if (event.target.classList.contains('editBtn')){
            DMMClickedProjectItem(nearestProjectItem);
            DMMOpenEditModal();
            DMMPopulateDashboard(storage, nearestProjectItem.id, dashboardContainer); 
        }
        // add project 
        else if (event.target.classList.contains('addBtn')){
            DMMOpenAddModal();
        }
        // delete project
        else if (event.target.classList.contains('deleteBtn')){
            const selectedProject = nearestProjectItem;
            let projectTitle;
            storage.forEach((projectItem) => {
            if (projectItem.id === selectedProject.id)
                projectTitle = projectItem.title
            });

            DMMClickedProjectItem(nearestProjectItem);
            DMMOpenDeleteModal(projectTitle);
            DMMPopulateDashboard(storage, selectedProject.id, dashboardContainer); 
        }
        // open create a new task modal
        else if (event.target.classList.contains('addTaskBtn')){
            DMMTaskCreationModal();
        }
        // close modal
        else if (event.target.classList.contains('closeBtn')){
             DMMCloseEditModal();
             DMMCloseAddModal();
             DMMCloseDeleteModal();
             DMMCloseTaskModal();
        }
        // mark task as complete
        else if (event.target.classList.contains('taskItemCheckbox')){
            const selectedProjectId = document.querySelector('.selectedProject').id;
            const dashboard = document.querySelector('#dashboard');
            LSMTickTask(storage, nearestTaskItem);
            DMMPopulateDashboard(storage, selectedProjectId, dashboard);
        }
        else if (event.target.classList.contains('editTaskBtn')){
            console.log("Viewing task");
        }
    });

    // submit event using event delegation
    document.addEventListener('submit', (event) => {
        event.preventDefault();

        if (event.target.classList.contains('editProjectNameForm')){
            const editFormInput = document.getElementById('editFormInput'); 
            const editformValue = editformInput.value;
            const selectedProject = document.querySelector('.selectedProject');
            // update the local storage
            LSMEditProjectName(storage, editformValue, selectedProject);
            
            // Close the modal
            DMMCloseEditModal();

            editformInput.value = '';

            // update the display name
            const projectItemLeft = selectedProject.querySelector('.projectItemLeft');
            const projectDisplay = projectItemLeft.querySelector('div');

            projectDisplay.textContent = editformValue;

            // update the dashboard
            const selectedProjectId = document.querySelector('.selectedProject').id;
            const dashboard = document.querySelector('#dashboard');
            DMMPopulateDashboard(storage, selectedProjectId, dashboard);
        }
        else if (event.target.classList.contains('addProjectForm')){
            const addFormInput = document.getElementById('addFormInput');
            const addFormValue = addFormInput.value;
            const scrollable = document.querySelector('.scrollable');

            // Create the project
            const newProject = LSMCreateProject(addFormValue);
            // Add to the local storage
            LSMAddNewProject(storage, newProject);
            // Create the new project item in the DOM
            DMMCreateProjectItem(newProject, scrollable);
            // Close the modal
            DMMCloseAddModal();
            addFormInput.value = '';
        }
        else if (event.target.classList.contains('deleteProjectForm')){     
            const selectedProject = document.querySelector('.selectedProject');
            storage = LSMDeleteProject(storage, selectedProject);
            DMMDeleteProject(storage, selectedProject);
            DMMCloseDeleteModal();
            const newlySelectedProject = document.querySelector('.selectedProject');
            const dashboardContainer = document.querySelector('#dashboard');
            DMMPopulateDashboard(storage, newlySelectedProject.id, dashboardContainer);
            console.log(storage);
        }
        else if (event.target.classList.contains('addTaskForm')){
            const title = document.querySelector('#taskName').value;
            const dueDate = document.querySelector('#taskDueDate').value;
            const priority = document.querySelector('#taskPriority').value;
            const description = document.querySelector('#taskDescription').value;
            const newTask = LSMCreateTask(title, description, dueDate, Number(priority), false);
            const selectedProjectId = document.querySelector('.selectedProject').id;
            LSMAddNewTask(storage, selectedProjectId, newTask);
            const dashboardBody = document.querySelector('.dashboardBody');
            
            DMMCreateTaskItem(newTask, dashboardBody);
            // refresh the dashboard
            DMMPopulateDashboard(storage, selectedProjectId, document.getElementById('dashboard'));
            DMMCloseTaskModal();
        }
    });
}

export{
    EHMDetectEvent,
}