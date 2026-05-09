import "./styles.css";
import * as myModules from './myModules.js';

// This IIFE contains all the logic for the website, where it all starts
(function websiteLogic (){
    const mainContainer = document.getElementById('content'); // the main container
    let storage = JSON.parse(localStorage.getItem('donezoData'));

    // The initial setUp when loading the website logic
    const setUp = () => {
        myModules.LSMCheckStorage(storage);
        // Recheck storage again if ever it is updated
        storage = JSON.parse(localStorage.getItem('donezoData'));

        myModules.DMMcreateSideBar(mainContainer, storage);
    };

    // Start of the website
    setUp();
})();
