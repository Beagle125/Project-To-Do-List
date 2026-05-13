import "./styles.css";
import * as myModules from './myModules.js';

// This IIFE contains all the logic for the website, where it all starts
(function websiteLogic (){
    const mainContainer = document.getElementById('content'); // the main container
    let storage = JSON.parse(localStorage.getItem('donezoData'));

    // The initial setUp when loading the website logic
    const setUp = () => {
        // Declare the selected project to be the first
        let selectedProjectIndex = 0;
        // Check for the storage if it contains valid values
        myModules.LSMCheckStorage(storage);
        // Recheck storage again if ever it is updated
        storage = JSON.parse(localStorage.getItem('donezoData'));
        // Create the modal
        myModules.DMMCreateEditModal(mainContainer);
        myModules.DMMCreateAddModal(mainContainer);
        // Create the sidebar
        myModules.DMMCreateSideBar(mainContainer, storage);
        // Create the dashboard
        myModules.DMMCreateDashboard(mainContainer);
    };

    // Start of the website
    setUp();

    // event detections
    myModules.EHMDetectEvent(mainContainer, storage);
})();
