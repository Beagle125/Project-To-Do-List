import "./styles.css";
import * as myModules from './myModules.js';

// The initial setUp when loading the website logic
(function setUp (){
    const mainContainer = document.getElementById('content');
    myModules.DMMcreateSideBar(mainContainer);
})();
