// Import images
import logoImg from '../static/logo.svg';
import addImg from '../static/add.svg';
import checkImg from '../static/checkmark.svg';
import deleteImg from '../static/delete.svg';
import editImg from '../static/edit.svg';
import closeImg from  '../static/remove.svg';
import saveImg from '../static/save.svg';
import checkboxImg from '../static/check.svg';
import uncheckboxImg from '../static/uncheck.svg';
import calendarImg from '../static/calendar.svg';


const DMMCreateProjectItem = (project, scrollable) => {
    // Create and add the proper attributes to projectItem
    let projectItem = document.createElement('div');
    projectItem.classList.add('projectItem');
    projectItem.classList.add('projectContent');
    projectItem.id = project.id;
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

const DMMCreateTaskItem = (task, dashboardBody) => {
    // main container
    const taskItem = document.createElement('div');
    taskItem.classList.add('taskItem');
    if (task.marked)
        taskItem.classList.add('taskMarked');
    taskItem.id = task.id;

    // left side which simply a single button
    const checkBtn = document.createElement('img');
    checkBtn.className = 'taskItemCheckbox';
    if (task.marked)
        checkBtn.src = checkboxImg;
    else
        checkBtn.src = uncheckboxImg;

    // Middle of the task item
    const title = document.createElement('p');
    title.className = 'taskItemHeader';
    title.textContent = task.title;

    const dateText = document.createElement('p');
    dateText.className = 'taskItemDate';
    dateText.textContent = task.due;
    const dateImg = document.createElement('img');
    dateImg.src = calendarImg;
    const date = document.createElement('div');
    date.appendChild(dateImg);
    date.appendChild(dateText);

    const priority = document.createElement('div');
    if (task.priority === 0){
        priority.className = 'taskEasy';
        priority.textContent = 'EASY';
        taskItem.classList.add('taskItemEasy');
    } 
    else if (task.priority === 1){
        priority.className = 'taskMedium';
        priority.textContent = 'MEDIUM';
        taskItem.classList.add('taskItemMedium');
    } 
    else{
        priority.className = 'taskHard';
        priority.textContent = 'HARD';
        taskItem.classList.add('taskItemHard');
    }  
    

    const middleContent = document.createElement('div');
    middleContent.appendChild(title);
    middleContent.appendChild(date);
    middleContent.appendChild(priority);

    // right side of task item
    const buttonDiv = document.createElement('div');
    const editBtn = document.createElement('img');
    editBtn.src = editImg;
    editBtn.className = 'editTaskBtn';
    const deleteBtn = document.createElement('img');
    deleteBtn.src = deleteImg;
    deleteBtn.className = 'deleteTaskBtn';
    buttonDiv.appendChild(editBtn);
    buttonDiv.appendChild(deleteBtn);

    // append everything
    taskItem.appendChild(checkBtn);
    taskItem.appendChild(middleContent);
    taskItem.appendChild(buttonDiv);

    dashboardBody.appendChild(taskItem);

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
    formInput.placeholder = 'Machine Project 1';
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

const DMMPopulateDashboard = (storage, selectedProjectId, dashboardContainer) => {
    // Remove exsiting child nodes
    dashboardContainer.replaceChildren();

    // Create the header
    DMMDashboardHeader(storage, selectedProjectId, dashboardContainer);

    // Create the body
    DMMDashboardBody(storage, selectedProjectId, dashboardContainer);
};

const DMMDashboardHeader = (storage, selectedProjectId, dashboardContainer) => {
    // Declare variables
    const dashboardHeader = document.createElement('div');
    const dashboardBody = document.createElement('div');
    const dashboardHeaderLeft = document.createElement('div');
    const dashboardHeaderText = document.createElement('p');
    const dashboardStats = document.createElement('div');
    const dashboardPending = document.createElement('p');
    const dashboardTotal = document.createElement('p');
    const addBtn = document.createElement('button');


    // Find the project of interest
    let selectedProject = storage.find(project => project.id === selectedProjectId);
    let total = selectedProject.todos.length;
    let pending = selectedProject.todos.filter(task => task.marked === false).length;

    // Create the header
    dashboardHeader.className = 'dashboardHeader';
    dashboardHeaderText.className = 'dashboardHeaderText';
    dashboardHeaderText.textContent = selectedProject.title;

    dashboardStats.className = 'dashboardStats';
    dashboardPending.className = 'dashboardPending';
    dashboardPending.textContent =`${pending} pending`;
    dashboardTotal.className = 'dashboardTotal';
    dashboardTotal.textContent =`${total} total`;

    addBtn.className = 'addTaskBtn';
    addBtn.textContent = 'Add Task';

    dashboardStats.appendChild(dashboardPending);
    dashboardStats.appendChild(dashboardTotal);

    dashboardHeaderLeft.appendChild(dashboardHeaderText);
    dashboardHeaderLeft.appendChild(dashboardStats);

    dashboardHeader.appendChild(dashboardHeaderLeft);
    dashboardHeader.appendChild(addBtn);

    dashboardContainer.appendChild(dashboardHeader);
};

const DMMDashboardBody = (storage, selectedProjectId, dashboardContainer) => {
    // Declare variables
    const project = storage.find(projectItem => projectItem.id === selectedProjectId);
    const taskArray = project.todos;
    const dashboardBody = document.createElement('div');
    dashboardBody.className = 'dashboardBody';

    if (taskArray.length > 0){
        taskArray.forEach((task) => {
            DMMCreateTaskItem(task, dashboardBody);
        });
    }
    else{
        const placeholder = document.createElement('p');
        placeholder.textContent = 'No tasks yet🥳'
        dashboardBody.appendChild(placeholder);
    }

    dashboardContainer.appendChild(dashboardBody);
};

const DMMCreateTaskModal = (mainContainer) => {
    const modal = document.createElement('dialog');
    modal.id = 'taskModal';

    const headerDiv = document.createElement('div');
    headerDiv.className = 'taskModalHeader';
    const closeBtn = document.createElement('img');
    closeBtn.src = closeImg;
    closeBtn.className = 'closeBtn';
    const headerText = document.createElement('p');
    headerText.className = 'taskModalHeaderText';
    headerDiv.appendChild(headerText);
    headerDiv.appendChild(closeBtn);

    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'taskModalBody';

    modal.appendChild(headerDiv);
    modal.appendChild(bodyDiv);
    mainContainer.appendChild(modal);
};

const DMMCloseTaskModal = () => {
    const modal = document.getElementById('taskModal'); 
    modal.close();
};

const DMMTaskCreationModal = () => {
    const modal = document.getElementById('taskModal');
    const modalHeader = modal.querySelector('.taskModalHeader');
    const modalBody = modal.querySelector('.taskModalBody');
    const modalHeaderText = modal.querySelector('.taskModalHeaderText');
    // header content
    modalHeaderText.textContent = 'Add a new task';
    // empty out the modal body
    modalBody.replaceChildren();
    const form = document.createElement('form');

    const title = document.createElement('input');
    const titleLabel = document.createElement('label');
    title.type = 'text';
    title.id = 'taskName';
    titleLabel.textContent = 'Title';
    titleLabel.for = 'taskName';
    form.appendChild(titleLabel);
    form.appendChild(title);

    const dueDate = document.createElement('input');
    const dueDateLabel = document.createElement('label');
    dueDate.type = 'date';
    dueDate.id = 'taskDueDate';
    dueDateLabel.textContent = 'Due Date';
    dueDateLabel.for = 'taskDueDate';
    form.appendChild(dueDateLabel);
    form.appendChild(dueDate);

    const priority = document.createElement('select');
    const priorityLabel = document.createElement('label');
    const easyOption = document.createElement('option');
    const mediumOption = document.createElement('option');
    const hardOption = document.createElement('option');
    priority.id = 'taskPriority';
    priorityLabel.textContent = 'Priority';
    priorityLabel.for = 'taskPriority';
    easyOption.value = 0;
    easyOption.textContent = 'Easy';
    mediumOption.value = 1;
    mediumOption.textContent = 'Medium';
    hardOption.value = 2;
    hardOption.textContent = 'Hard';
    priority.appendChild(easyOption);
    priority.appendChild(mediumOption);
    priority.appendChild(hardOption);
    form.appendChild(priorityLabel);
    form.appendChild(priority);

    const description = document.createElement('textarea');
    const descriptionLabel = document.createElement('label');
    description.id = 'taskDescription';
    descriptionLabel.textContent = 'Description';
    descriptionLabel.for = 'taskDescription';
    form.appendChild(descriptionLabel);
    form.appendChild(description);

    const submit = document.createElement('button');
    submit.textContent = 'Submit';
    form.appendChild(submit);

    modalBody.appendChild(form);

    modal.showModal();

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
    DMMPopulateDashboard,
    DMMCreateTaskModal,
    DMMCloseTaskModal,
    DMMTaskCreationModal,
}