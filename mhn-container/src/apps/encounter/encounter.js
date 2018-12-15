import React from 'react';
//import ReactDOM from 'react-dom';
import $ from 'jquery';
import './encounter.css'
import loadingImg from './loading.gif'

export default class EncounterApp extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
           isLoaded: false,
           errorMsg: "",
           encounters: []
       };
    }

    onError() {
      console.log("EntercounterApp error: authorization failed!");
      this.setState( { errorMsg:"authorization failed! please contact your administrator." });
    }

    onEncounterReady(smart) {
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
       //console.log("debug: componentDidMount");
  }

  startToGetEncounter() {
       window.FHIR.oauth2.ready(this.onEncounterReady.bind(this), this.onError.bind(this));
  }

  reset() {
     this.setState( {
         isLoaded: false,
         errorMsg: "",
         encounters: []
      }
     );
  }

  render() {
      var encounters = this.state.encounters;
      var errMsg = this.state.errorMsg;

      if(encounters.length===0) {
        if(errMsg.length===0) {
          this.startToGetEncounter();
          return (
           <div className="encounter_app_container">
              {/* 
               <div onClick={()=>this.startToGetEncounter()}> Encounters: { this.state.encounters.length } </div>
              */}
              <img src={loadingImg} alt="loading..." />
           </div>
         );
       }else {
          return(
            <div className="encounter_app_container">
               <div> {errMsg} </div>
               <div onClick={ ()=> this.reset()} > Click here to retry </div>
            </div>
          );
       }
      } else {
         return (
           <div className="encounter_app_container">
              <div onClick={()=>this.startToGetEncounter()}> Encounters: { this.state.encounters.length } </div>
              { encounters.map(encounter => <div> {encounter.location[0].location.display} </div>) }
           </div>
         );
      }
  }

}


