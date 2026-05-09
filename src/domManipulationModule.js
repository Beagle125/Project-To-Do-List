// Import images
import logoImg from '../static/logo.svg';
import addImg from '../static/add.svg';

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
        projectItem.classList.add('projectItem');

        /*This is for the initially selected project*/
        if (!projectCount)
            projectItem.classList.add('selectedProject');

        projectItem.id = `${project.id}`;
        projectItem.textContent = `${project.title}`;

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

export{
    DMMcreateSideBar,
}