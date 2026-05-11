// Import images
import logoImg from '../static/logo.svg';
import addImg from '../static/add.svg';
import checkImg from '../static/checkmark.svg';
import deleteImg from '../static/delete.svg';
import editImg from '../static/edit.svg';

const DMMcreateSideBar = (mainContainer, storage) => {
    console.log("Creating the side bar...")

    /*Create the sidebar div and its children*/
    const sidebar = document.createElement('div');
    const logo = document.createElement('div');
    const logoImageElement = document.createElement('img');
    const projects = document.createElement('div');
    const addBtn = document.createElement('img');
    const header = document.createElement('p');
    const scrollable = document.createElement('div');

    /*Give the correct classes and attributes*/
    sidebar.id = 'sidebar';
    logo.id = 'logo';
    logoImageElement.src = logoImg;
    header.textContent = 'Projects';
    projects.id = 'projects';
    scrollable.className = 'scrollable';
    addBtn.className = 'addBtn';
    addBtn.src = addImg;

    /*Logic for creating each projectItem*/
    let projectCount = 0;
    for (let project of storage){
        let projectItem = document.createElement('div');
        let projectItemLeft = document.createElement('div');
        let projectItemText = document.createElement('div');
        let projectCheckImg = document.createElement('img');

        projectCheckImg.src = checkImg;
        projectItemLeft.appendChild(projectCheckImg);

        projectItemText.textContent =  `${project.title}`;
        projectItemLeft.appendChild(projectItemText);


        projectItem.classList.add('projectItem');
        projectItemLeft.className = 'projectItemLeft';

        /*This is for the initially selected project*/
        if (!projectCount)
            projectItem.classList.add('selectedProject');

        projectItem.id = `${project.id}`;

        projectItem.appendChild(projectItemLeft);
        scrollable.appendChild(projectItem);
        projectCount++;
    }

    /*Stitch everything together*/
    logo.appendChild(logoImageElement);
    
    projects.appendChild(header);
    projects.appendChild(scrollable);

    sidebar.appendChild(logo);
    sidebar.appendChild(projects);
    sidebar.appendChild(addBtn);

    mainContainer.appendChild(sidebar);
};

const DMMhoverProjectItem = (projectItem) => {
    const projectItemRight = document.createElement('div');
    const deleteBtn = document.createElement('img');
    const editBtn = document.createElement('img');

    deleteBtn.src = deleteImg;
    editBtn.src = editImg;

    projectItemRight.className = 'projectItemRight';
    deleteBtn.className = 'deleteBtn';
    editBtn.className = 'editBtn';

    projectItemRight.appendChild(editBtn);
    projectItemRight.appendChild(deleteBtn);

    projectItem.appendChild(projectItemRight);
}

const DMMunhoverProjectItem = (projectItem) => {
    const projectItemRight = projectItem.querySelector('.projectItemRight');

    projectItemRight.remove();
}

const DMMclickedProjectItem = (projectItem) => {
    const currentlySelected = document.querySelector('.selectedProject');

    /*Remove the selectedProject class*/
    currentlySelected.classList.remove('selectedProject');

    /*Add the selectedProject class to the newly selected item*/
    projectItem.classList.add('selectedProject');
}
export{
    DMMcreateSideBar,
    DMMhoverProjectItem,
    DMMunhoverProjectItem,
    DMMclickedProjectItem,
}