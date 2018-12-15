import React from 'react';
import ReactDOM from 'react-dom';
import PatientApp from './apps/patient/patient.js'
import EncounterApp from './apps/encounter/encounter.js'
import EconsultApp  from './apps/econsult/econsult.js'


class AppMain extends React.Component {
    startApp(appName) {
        switch(appName) {
           case "patient":
                ReactDOM.render(<PatientApp />, document.getElementById("patient"));
                break;
           case "econsult":
                ReactDOM.render(<EconsultApp />, document.getElementById("econsult"));
                break;
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

