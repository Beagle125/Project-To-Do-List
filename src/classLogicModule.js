// Class Declaration for type Project
const Project = class{
    constructor(id, title, todos){
        this._id = id;
        this._title = title;
        this._todos = todos;
    }

    // getters
    get id(){
        return this._id;
    };

    get title(){
        return this._title;
    };

    get todos(){
        return this._todos;
    };

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
        this._id = id;
        this._title = title;
        this._description = description;
        this._due = due;
        this._priority = priority;
        this._marked = marked;
    }

    // getters 
    get id(){
        return this._id;
    };

    get title(){
        return this._title;
    };

    get description(){
        return this._description;
    }

    get due(){
        return this._due;
    };

    get priority(){
        return this._priority;
    };

    get marked(){
        return this._marked;
    }

    // setters
    set id (id){
        this._id = id;
    };

    set title(title){
        this._title;
    };

    set description(description){
        this._description;
    };

    set due(due){
        this._due;
    };

    set priority(priority){
        this._priority = priority;
    };

    set marked(marked){
        this._marked = marked;
    };
}

export{
    Project as "CLMProject",
    Task as "CLMTask",
}