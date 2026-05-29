// Class Declaration for type Project
const Project = class{
    constructor(id, title, todos){
        this.id = id;
        this.title = title;
        this.todos = todos;
    }  

    // getters
    get id(){
        return this._id;
    }
    get title(){
        return this._title;
    }
    get todos(){
        return this._todos;
    }

    // setters
    set id(id){
        this._id = id;
    }
    set title(title){
        this._title = title;
    }
    set todos(todos){
        this._todos = todos;
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
    // getters
    get id(){
        return this._id;
    }
    get title(){
        return this._title;
    }
    get description(){
        return this._description;
    }
    get due(){
        return this._due;
    }
    get priority(){
        return this._priority;
    }
    get marked(){
        return this._marked;
    }
    // setters
    set id(id){
        this._id = id;
    }
    set title(title){
        this._title = title;
    }
    set description(description){
        this._description = description;
    }
    set due(due){
        this._due = due;
    }
    set priority(priority){
        this._priority = priority;
    }
    set marked(marked){
        this._marked = marked;
    }
}

export{
    Project as "CLMProject",
    Task as "CLMTask",
}