import React from 'react';
import ReactDOM from 'react-dom';
import EncounterApp from './apps/encounter/encounter.js'


class AppMain extends React.Component {
    startApp(appName) {
        switch(appName) {
           case "encounter":
                ReactDOM.render(<EncounterApp />, document.getElementById("encounter"));
                break;
           default:
                console.log(appName + " is not defined in index.js!");
        }
    }

    render() {
        return (null);   
    }
}

//DO NOT CHANGE ANYTHING FROM HERE DOWN
window.mhnApplicationMain = ReactDOM.render(React.createElement(AppMain), document.getElementById("application_main"));

