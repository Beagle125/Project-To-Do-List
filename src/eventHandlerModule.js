import { DMMhoverProjectItem } from "./domManipulationModule.js";
import { DMMunhoverProjectItem } from "./domManipulationModule.js";


const EHMDetectEvent = () => {
    const projects = document.querySelectorAll('.projectItem');

    // Hover event for each project item
    projects.forEach((projectItem) => {
        projectItem.addEventListener('mouseenter', () => {
            DMMhoverProjectItem(projectItem);
        });
        projectItem.addEventListener('mouseleave', () => {
            DMMunhoverProjectItem(projectItem);
        });
    });
}

export{
    EHMDetectEvent,
}