// Class Declaration for type Project
const Project = class{
    constructor(id, title, todos){
        this.id = id;
        this.title = title;
        this.todos = todos;
    }   
}

const Task = class{
    constructor(id, title, description, due, priority, marked){
        this.id = id;
        this.title = title;
        this.description = description;
        this.due = due;
        this.priority = priority;
        this.marked = marked;
    }
}

export{
    Project as "CLMProject",
    Task as "CLMTask",
}