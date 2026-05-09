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

export{
    LSMCheckStorage
}