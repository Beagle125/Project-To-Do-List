const LSMCheckStorage = (storage) => {
    /* Intial check of storage item*/
    if (!storage){
        let defaultData = [0];
        localStorage.setItem('donezoData', defaultData);
    }
}

export{
    LSMCheckStorage
}