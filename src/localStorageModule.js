import { CLMProject } from "./classLogicModule";

const LSMCheckStorage = (storage) => {
    /* Intial check of storage item*/
    if (!storage){
        let defaultData = []
        let defaultProject = new CLMProject(self.crypto.randomUUID(), "Project 1", []);
        defaultData.push(defaultProject);
        localStorage.setItem('donezoData', JSON.stringify(defaultData));
    }
}

export{
    LSMCheckStorage
}