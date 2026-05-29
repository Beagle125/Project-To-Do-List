import "./styles.css";
import * as myModules from './myModules.js';

//localStorage.clear();
// This IIFE contains all the logic for the website, where it all starts
(function websiteLogic (){
    const mainContainer = document.getElementById('content'); // the main container
    let storage = []; // the main storage to be used in the session
    // The initial setUp when loading the website logic
    const setUp = () => {
        // Check for the storage if it contains valid values
        myModules.LSMCheckStorage();
        // Gather the data from local storage and objectify it
        myModules.LSMObjectify(storage);
        // Create the modal
        myModules.DMMCreateEditModal(mainContainer);
        myModules.DMMCreateAddModal(mainContainer);
        myModules.DMMCreateDeleteModal(mainContainer);
        myModules.DMMCreateTaskModal(mainContainer);
        // Create the sidebar
        myModules.DMMCreateSideBar(mainContainer, storage);
        // Create the dashboard
        myModules.DMMCreateDashboard(mainContainer);
        // Populate the dashboard
        let selectedProjectId = document.querySelector('.selectedProject').id;
        let dashboard = document.querySelector('#dashboard');
        myModules.DMMPopulateDashboard(storage, selectedProjectId, dashboard);
    };

    // Start of the website
    setUp();

    // event detections
    myModules.EHMDetectEvent(mainContainer, storage);
})();
