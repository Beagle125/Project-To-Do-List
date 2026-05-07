import { Project } from "./classLogicModule";

const LSMCheckStorage = (storage) => {
    /* Intial check of storage item*/
    if (!storage){
        let defaultData = new Project(self.crypto.randomUUID(), "Project 1", []);
        localStorage.setItem('donezoData', JSON.stringify(defaultData));
    }
}

export{
    LSMCheckStorage
}