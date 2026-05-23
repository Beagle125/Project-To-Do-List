import { CLMProject } from "./classLogicModule.js";
import { CLMTask } from "./classLogicModule.js";

const LSMCreateProject = (projectTitle) => {
    let project = new CLMProject(self.crypto.randomUUID(), projectTitle, []);
    return project
};

const LSMAddNewProject = (storage, project) => {
    storage.push(project);
    localStorage.setItem('donezoData', JSON.stringify(storage));
};

const LSMCreateTask = (taskTitle, taskDescription, taskDue, taskPriority, taskMarked) => {
    let task = new CLMTask(self.crypto.randomUUID(),  taskTitle, taskDescription, taskDue, taskPriority, taskMarked);
    return task;
};

const LSMAddNewTask = (storage, projectId, task) => {
    let projectIndex = storage.findIndex(project => project.id === projectId);
    storage[projectIndex].todos.push(task);
    localStorage.setItem('donezoData', JSON.stringify(storage));
};

const LSMTickTask = (storage, taskItem) => {
    const projectId = document.querySelector('.selectedProject').id;
    const taskId = taskItem.id;
    const projectIndex = storage.findIndex(project => project.id === projectId);

    console.log(projectIndex);

    const taskIndex = storage[projectIndex].todos.findIndex(task => task.id === taskId);

    // change the value of the marked
    storage[projectIndex].todos[taskIndex].marked = !(storage[projectIndex].todos[taskIndex].marked);

    // update local storage
    localStorage.setItem('donezoData', JSON.stringify(storage));
};

const LSMCheckStorage = (storage) => {
    /* Intial check of storage item*/
    if (!storage){
        // Add project 1
        let defaultData = []
        let defaultProject1 = LSMCreateProject('Project 1');
        LSMAddNewProject(defaultData, defaultProject1);
        // Add task 1
        let task1 = LSMCreateTask('Todo1', 'My very first todo', 'March 16, 2007', 0, false); //date formatting and priority is not yet applied here
        let projectId = defaultData[0].id;
        LSMAddNewTask(defaultData, projectId, task1);
    }
}

const LSMEditProjectName = (storage, newValue, selectedProject) => {
    const selectedProjectId = selectedProject.id;

    storage.forEach((projectItem) => {
        if (projectItem.id === selectedProjectId)
            projectItem.title = newValue;
    }); 

    // update the local storage
    localStorage.setItem('donezoData', JSON.stringify(storage));

};

const LSMDeleteProject = (storage, selectedProject) => {
    const selectedProjectId = selectedProject.id;

    // delete the project
    let newStorage = storage.filter((projectItem) => projectItem.id !== selectedProjectId);
    // update the local storage
    localStorage.setItem('donezoData', JSON.stringify(newStorage));
    // return to update our main storage array
    return newStorage;
};

export{
    LSMCheckStorage,
    LSMEditProjectName,
    LSMCreateProject,
    LSMAddNewProject,
    LSMDeleteProject,
    LSMTickTask,
}