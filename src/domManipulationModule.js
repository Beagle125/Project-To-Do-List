// Import images
import logoImg from '../static/logo.svg';
import addImg from '../static/add.svg';
import checkImg from '../static/checkmark.svg';
import deleteImg from '../static/delete.svg';
import editImg from '../static/edit.svg';
import closeImg from  '../static/remove.svg';
import saveImg from '../static/save.svg';

const DMMCreateProjectItem = (project, scrollable) => {
    // Create and add the proper attributes to projectItem
    let projectItem = document.createElement('div');
    projectItem.classList.add('projectItem');
    projectItem.classList.add('projectContent');
    projectItem.id = `${project.id}`;
    // Create the left side properties and their attributes
    let projectItemLeft = document.createElement('div');
    let projectItemText = document.createElement('div');
    let projectCheckImg = document.createElement('img');

    projectCheckImg.src = checkImg;
    projectItemLeft.appendChild(projectCheckImg);

    projectItemText.textContent =  `${project.title}`;
    projectItemLeft.appendChild(projectItemText);

    projectItemLeft.className = 'projectItemLeft';
    projectItem.appendChild(projectItemLeft);
    // if this is the only project
    if (!scrollable.querySelector('.selectedProject'))
        projectItem.classList.add('selectedProject');
    // Append the newly created project item to the scrollable
    scrollable.appendChild(projectItem);
};

const DMMCreateSideBar = (mainContainer, storage) => {
    console.log("Creating the side bar...")

    //Create the sidebar div and its children
    const sidebar = document.createElement('div');
    const logo = document.createElement('div');
    const logoImageElement = document.createElement('img');
    const projects = document.createElement('div');
    const addBtn = document.createElement('img');
    const header = document.createElement('p');
    const scrollable = document.createElement('div');

    //Give the correct classes and attributes
    sidebar.id = 'sidebar';
    logo.id = 'logo';
    logoImageElement.src = logoImg;
    header.textContent = 'Projects';
    projects.id = 'projects';
    scrollable.className = 'scrollable';
    addBtn.className = 'addBtn';
    addBtn.src = addImg;

    //Logic for creating each projectItem
    for (let project of storage){
        // Create the project item
        DMMCreateProjectItem(project, scrollable);
    }

    // Add the selectedProject class name to the first project
    if (storage.length > 0 && !scrollable.querySelector('.selectedProject')){
        const firstProject = scrollable.querySelector('.projectItem');
        firstProject.classList.add('selectedProject');
        console.log(firstProject);
    }


    //Stitch everything together
    logo.appendChild(logoImageElement);
    
    projects.appendChild(header);
    projects.appendChild(scrollable);

    sidebar.appendChild(logo);
    sidebar.appendChild(projects);
    sidebar.appendChild(addBtn);

    mainContainer.appendChild(sidebar);
};

const DMMCreateDashboard = (mainContainer) => {
    const dashboard = document.createElement('div');
    dashboard.id = 'dashboard';

    mainContainer.appendChild(dashboard);
};

const DMMHoverProjectItem = (projectItem) => {
    const projectItemRight = document.createElement('div');
    const deleteBtn = document.createElement('img');
    const editBtn = document.createElement('img');

    deleteBtn.src = deleteImg;
    editBtn.src = editImg;

    projectItemRight.classList.add('projectContent');
    projectItemRight.classList.add('projectItemRight');

    deleteBtn.classList.add('deleteBtn');
    deleteBtn.classList.add('projectContent');

    editBtn.classList.add('editBtn');
    editBtn.classList.add('projectContent');

    projectItemRight.appendChild(editBtn);
    projectItemRight.appendChild(deleteBtn);

    projectItem.appendChild(projectItemRight);
};

const DMMUnhoverProjectItem = (projectItem) => {

    const projectItemRight = document.querySelector('.projectItemRight');

    if (projectItemRight)
        projectItemRight.remove();
};

const DMMClickedProjectItem = (projectItem) => {
    const currentlySelected = document.querySelector('.selectedProject');

    //Remove the selectedProject class
    currentlySelected.classList.remove('selectedProject');

    //Add the selectedProject class to the newly selected item
    projectItem.classList.add('selectedProject');
};

const DMMCreateEditModal = (mainContainer) => {
    const modal = document.createElement('dialog');
    modal.id = 'editModal';

    const closeBtn = document.createElement('img');
    closeBtn.src = closeImg;
    closeBtn.className = 'closeBtn';

    const header = document.createElement('p');
    header.className = 'modalHeader';
    header.textContent = 'Change the name of your project';

    modal.appendChild(header);
    modal.appendChild(closeBtn);


    const form = document.createElement('form');
    const formInput =  document.createElement('input');
    const saveBtn = document.createElement('button')

    form.className = 'editProjectNameForm';
    form.autocomplete = 'off';

    formInput.type = 'text';
    formInput.placeholder = 'New name';
    formInput.id = 'editformInput';
    formInput.className = 'formInput';
    formInput.required = true;

    saveBtn.textContent = 'Save';
    saveBtn.className = 'saveBtn';

    form.appendChild(formInput);
    form.appendChild(saveBtn);
    modal.appendChild(form);

    mainContainer.appendChild(modal);
}

const DMMOpenEditModal = () => {
    const modal = document.getElementById('editModal');
    modal.showModal();
};

const DMMCloseEditModal = () => {
    const modal = document.getElementById('editModal'); 
    modal.close();
};


const DMMCreateAddModal = (mainContainer) => {
    const modal = document.createElement('dialog');
    modal.id = 'addModal';

    const closeBtn = document.createElement('img');
    closeBtn.src = closeImg;
    closeBtn.className = 'closeBtn';

    const header = document.createElement('p');
    header.className = 'modalHeader';
    header.textContent = 'Give a name to your new project';

    modal.appendChild(header);
    modal.appendChild(closeBtn);

    const form = document.createElement('form');
    const formInput =  document.createElement('input');
    const saveBtn = document.createElement('button');

    form.className = 'addProjectForm';
    form.autocomplete = 'off';

    formInput.type = 'text';
    formInput.placeholder = 'New project name';
    formInput.id = 'addFormInput';
    formInput.className = 'formInput';
    formInput.required = true;

    saveBtn.textContent = 'Create';
    saveBtn.className = 'saveBtn';

    form.appendChild(formInput);
    form.appendChild(saveBtn);
    modal.appendChild(form);

    mainContainer.appendChild(modal);
};

const DMMOpenAddModal = () => {
    const modal = document.getElementById('addModal');
    modal.showModal();
};

const DMMCloseAddModal = () => {
    const modal = document.getElementById('addModal'); 
    modal.close();
};

const DMMCreateDeleteModal = (mainContainer) => {
    const modal = document.createElement('dialog');
    modal.id = 'deleteModal';

    const closeBtn = document.createElement('img');
    closeBtn.src = closeImg;
    closeBtn.className = 'closeBtn';

    const header = document.createElement('p');
    header.className = 'modalHeader';
    header.textContent = 'Confirm the deletion of ';

    const breakLine = document.createElement('br');
    header.appendChild(breakLine);

    const span = document.createElement('span');
    span.textContent = '';

    header.appendChild(span);

    modal.appendChild(header);
    modal.appendChild(closeBtn);

    const form = document.createElement('form');
    form.className = 'deleteProjectForm';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'confirmDeleteBtn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.type = 'submit';

    form.appendChild(deleteBtn)
    modal.appendChild(form);

    mainContainer.appendChild(modal);
};

const DMMOpenDeleteModal = (projectTitle) => {
    const modal = document.getElementById('deleteModal');
    //const pTag = modal.querySelector('.headerModal');
    const span = modal.querySelector('span');

    span.textContent = projectTitle;

    modal.showModal();
}
const DMMCloseDeleteModal = () => {
    const modal = document.getElementById('deleteModal');
    modal.close()
}

const DMMDeleteProject = (storage, projectItem) => {
    projectItem.remove();
    if (storage.length > 0){
        const firstProject = document.querySelector('.projectItem');
        firstProject.classList.add('selectedProject');
    }

};

export{
    DMMCreateProjectItem,
    DMMCreateSideBar,
    DMMCreateDashboard,
    DMMHoverProjectItem,
    DMMUnhoverProjectItem,
    DMMClickedProjectItem,
    DMMCreateEditModal,
    DMMOpenEditModal,
    DMMCloseEditModal,
    DMMCreateAddModal,
    DMMOpenAddModal,
    DMMCloseAddModal,
    DMMCreateDeleteModal,
    DMMOpenDeleteModal,
    DMMCloseDeleteModal,
    DMMDeleteProject,
}