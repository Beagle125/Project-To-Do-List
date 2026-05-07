import "./styles.css";
import * as myModules from './myModules.js';

// The initial setUp when loading the website logic
(function websiteLogic (){
    const mainContainer = document.getElementById('content'); // the main container
    let storage = localStorage.getItem('donezoData');


    const setUp = (mainContainer) => {
        /* Intial check of storage item*/
        if (!storage){
            let defaultData = [0];
            localStorage.setItem('donezoData', defaultData);
        }

        myModules.DMMcreateSideBar(mainContainer);
    };

    setUp();
})();
