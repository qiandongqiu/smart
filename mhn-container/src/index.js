import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './index.css'

function HelloWorld(props) {
    return (
       <div>{props.value}</div>
    );
}


class EncounterTab extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
           isLoaded: false,
           encounters: {}
       };
    }

    onError() {
      console.log("EntercounterTab error: authorization failed!");
    }

    onEncounterReady(smart) {
      var currentEncounters = this.state.encounters;
      if (smart.hasOwnProperty('patient')) {
          var getEncounters = smart.patient.api.fetchAll({
                    type: 'Encounter'  //'Appointment',  //'Schedule',   //Encounter
                  });

          $.when(getEncounters).fail(this.onError);
          $.when(getEncounters).done( function(encountersData) {
             console.log(this);
             this.setState({
                  isLoaded: true,
                  encounters: encountersData
             });
          }.bind(this));

      } else {
        this.onError();
      }

  }

  componentDidMount() {
       console.log("debug: componentDidMount");
  }

  startToGetEncounter() {
       window.FHIR.oauth2.ready(this.onEncounterReady.bind(this), this.onError.bind(this))
  }
 
  render() {
      return (
         <div onClick={()=>this.startToGetEncounter()}> Encounters: { this.state.encounters.length } </div>
      );
  }

}


//ReactDOM.render(<HelloWorld value='hello dq' />, document.getElementById("mhn_root"));
ReactDOM.render(<EncounterTab />, document.getElementById("mhn_root"));
