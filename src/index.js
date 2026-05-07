import "./styles.css";
import * as myModules from './myModules.js';

// This IIFE contains all the logic for the website, where it all starts
(function websiteLogic (){
    const mainContainer = document.getElementById('content'); // the main container
    let storage = localStorage.getItem('donezoData');


    // The initial setUp when loading the website logic
    const setUp = (mainContainer) => {
        myModules.LSMCheckStorage(storage);
        myModules.DMMcreateSideBar(mainContainer);
    };


    // Start of the website
    setUp();

})();
