import { DMMCreateEditModal, DMMHoverProjectItem, DMMUnhoverProjectItem, 
       DMMClickedProjectItem, DMMCreateProjectItem,  
       DMMOpenEditModal, DMMCloseEditModal, 
       DMMOpenAddModal, DMMCloseAddModal, 
       DMMOpenDeleteModal, DMMCloseDeleteModal,
       DMMDeleteProject, DMMPopulateDashboard} from "./domManipulationModule.js";
import { LSMEditProjectName, LSMCreateProject, LSMAddNewProject, LSMDeleteProject } from "./localStorageModule.js";

const EHMDetectEvent = (mainContainer, storage) => {
    const addProjectBtn = document.querySelector('#sidebar .addBtn');
    let isProjectHovered = false;

    // Hover event for each project item using event delegation
    document.addEventListener('mouseover', (event) => {
        let nearestProjectItem = event.target.closest('.projectItem');
        if (nearestProjectItem && !nearestProjectItem.querySelector('.projectItemRight')){
            let projectItem = event.target;
            DMMHoverProjectItem(projectItem);
            isProjectHovered = true;
        }
    });

    // This will serve as the unhover event for the project items
    document.addEventListener('mousemove', (event) => {
        let nearestProjectItem = event.target.closest('.projectItem');
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
        /*
        let nearestProjectItem;
        let projectItem;
        let selectedProjectId;
        let dashboardContainer;
        if (event.target.classList.contains('.projectItem')){
            nearestProjectItem = event.target.closest('.projectItem');
            projectItem = event.target;
            selectedProjectId = nearestProjectItem.id;
            dashboardContainer = document.querySelector('#dashboard');
        }
            */

        const nearestProjectItem = event.target.closest('.projectItem');
        const dashboardContainer = document.querySelector('#dashboard');

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
        // close modal
        else if (event.target.classList.contains('closeBtn')){
             DMMCloseEditModal();
             DMMCloseAddModal();
             DMMCloseDeleteModal();
        }
    });

    // submit event using event delegation
    document.addEventListener('submit', (event) => {
        event.preventDefault();

        if (event.target.classList.contains('editProjectNameForm')){
            const editFormInput = document.getElementById('editFormInput'); 
            let editformValue = editformInput.value;
            let selectedProject = document.querySelector('.selectedProject');
            // update the local storage
            LSMEditProjectName(storage, editformValue, selectedProject);
            
            // Close the modal
            DMMCloseEditModal();

            editformInput.value = '';

            // update the display name
            let projectItemLeft = selectedProject.querySelector('.projectItemLeft');
            let projectDisplay = projectItemLeft.querySelector('div');

            projectDisplay.textContent = editformValue;
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
    });
}

export{
    EHMDetectEvent,
}