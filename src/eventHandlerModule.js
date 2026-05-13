import { DMMCreateEditModal, DMMHoverProjectItem, DMMUnhoverProjectItem, DMMClickedProjectItem, DMMOpenEditModal, DMMCloseEditModal, DMMOpenAddModal, DMMCloseAddModal, DMMCreateProjectItem} from "./domManipulationModule.js";
import { LSMEditProjectName, LSMCreateProject, LSMAddNewProject } from "./localStorageModule.js";

const EHMDetectEvent = (mainContainer, storage) => {
    const addProjectBtn = document.querySelector('#sidebar .addBtn');
    let isProjectHovered = false;

    // Hover event for each project item using event delegation
    document.addEventListener('mouseover', (event) => {
        let targetDiv = event.target.closest('.projectItem');
        if (targetDiv && !targetDiv.querySelector('.projectItemRight')){
            let projectItem = event.target;
            DMMHoverProjectItem(projectItem);
            isProjectHovered = true;
        }
    });

    /*
    // unhover event for each project item using event delegation
    document.addEventListener('mouseout', (event) => {
        let targetDiv = event.target.closest('.projectItem');
        let destination = event.relatedTarget;
        let timer;
        if (targetDiv === event.target && !targetDiv.contains(destination)){ // this is not fully working. When you hover over outside the sidebar
            let projectItem = event.target;
            DMMUnhoverProjectItem(projectItem);  
            isProjectHovered = false;
        }
    });
    */
    
    // This will serve as the unhover event for the project items
    document.addEventListener('mousemove', (event) => {
        let targetDiv = event.target.closest('.projectItem');
        
        console.log(isProjectHovered);
        if (document.querySelector('.projectItemRight'))
            isProjectHovered = true;
        if (isProjectHovered && !event.target.classList.contains('projectContent')){
            let projectItem = targetDiv;
            DMMUnhoverProjectItem(projectItem);
            isProjectHovered = false;
        }
    });
    


    // click events using event delegation
    mainContainer.addEventListener('click', (event) => {
        const targetDiv = event.target.closest('.projectItem');
        // projectItem select
        if (event.target === targetDiv){
            const projectItem = event.target;
            DMMClickedProjectItem(projectItem);  
        }      
        // edit Project name
        else if (event.target.classList.contains('editBtn')){
            DMMClickedProjectItem(targetDiv);
            DMMOpenEditModal();
        }
    });


    // Add a new project event
    addProjectBtn.addEventListener('click', () => {
        DMMOpenAddModal();
    });

    // Close modal event
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('closeBtn')){
             DMMCloseEditModal();
             DMMCloseAddModal();
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
    });
}

export{
    EHMDetectEvent,
}