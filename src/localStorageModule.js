import { CLMProject } from "./classLogicModule";

const LSMCheckStorage = (storage) => {
    /* Intial check of storage item*/
    if (!storage){
        let defaultData = []
        let defaultProject1 = new CLMProject(self.crypto.randomUUID(), "Project 1", []);
        let defaultProject2 = new CLMProject(self.crypto.randomUUID(), "Project 2", []);
        defaultData.push(defaultProject1);
        defaultData.push(defaultProject2);
        localStorage.setItem('donezoData', JSON.stringify(defaultData));
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

export{
    LSMCheckStorage,
    LSMEditProjectName,
}