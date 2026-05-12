import { DMMCreateEditModal, DMMHoverProjectItem, DMMUnhoverProjectItem, DMMClickedProjectItem, DMMOpenEditModal, DMMCloseEditModal } from "./domManipulationModule.js";
import { LSMEditProjectName } from "./localStorageModule.js";

const EHMDetectEvent = (mainContainer, storage) => {
    const projects = document.querySelectorAll('.projectItem');

    // Hover event for each project item
    projects.forEach((projectItem) => {
        projectItem.addEventListener('mouseenter', () => {
            DMMHoverProjectItem(projectItem);
            const deleteBtn = projectItem.querySelector('.deleteBtn');
            const editBtn = projectItem.querySelector('.editBtn');
            deleteBtn.addEventListener('click', () => {
                alert('Project Item has been deleted!');
            });
            editBtn.addEventListener('click', () => {
                DMMOpenEditModal();
            });
        });
        projectItem.addEventListener('mouseleave', () => {
            DMMUnhoverProjectItem(projectItem);
        });
        projectItem.addEventListener('click', () => {
            DMMClickedProjectItem(projectItem);
        });
    });

    // Close modal event
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('closeBtn'))
            DMMCloseEditModal();
    });

    // submit event
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
    });
}

export{
    EHMDetectEvent,
}