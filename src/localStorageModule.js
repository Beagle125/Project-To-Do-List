import { CLMProject } from "./classLogicModule.js";

const LSMCreateProject = (projectTitle) => {
    let project = new CLMProject(self.crypto.randomUUID(), projectTitle, []);
    return project
};

const LSMAddNewProject = (storage, project) => {
    storage.push(project);
    localStorage.setItem('donezoData', JSON.stringify(storage));
};

const LSMCheckStorage = (storage) => {
    /* Intial check of storage item*/
    if (!storage){
        let defaultData = []
        let defaultProject1 = LSMCreateProject('Project 1');
        LSMAddNewProject(defaultData, defaultProject1);
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
}