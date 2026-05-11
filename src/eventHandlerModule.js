import { DMMhoverProjectItem } from "./domManipulationModule.js";
import { DMMunhoverProjectItem } from "./domManipulationModule.js";
import { DMMclickedProjectItem } from "./domManipulationModule.js";


const EHMDetectEvent = () => {
    const projects = document.querySelectorAll('.projectItem');

    // Hover event for each project item
    projects.forEach((projectItem) => {
        projectItem.addEventListener('mouseenter', () => {
            DMMhoverProjectItem(projectItem);
            const deleteBtn = projectItem.querySelector('.deleteBtn');
            const editBtn = projectItem.querySelector('.editBtn');
            deleteBtn.addEventListener('click', () => {
                alert('Project Item has been deleted!');
            });
            editBtn.addEventListener('click', () => {
                alert('Project Item has been edited!');
            });
        });
        projectItem.addEventListener('mouseleave', () => {
            DMMunhoverProjectItem(projectItem);
        });
        projectItem.addEventListener('click', () => {
            DMMclickedProjectItem(projectItem);
        });
    });
}

export{
    EHMDetectEvent,
}