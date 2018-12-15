import React from 'react';
//import ReactDOM from 'react-dom';
import $ from 'jquery';
import './patient.css'
import loadingImg from './loading.gif'

export default class PatientApp extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
           isLoaded: false,
           errorMsg: "",
           patient: null
       };
    }

    onError() {
      console.log("PatientApp error: authorization failed!");
      this.setState( { errorMsg:"authorization failed! please contact your administrator." });
    }


   onPatientReady(smart) {
       if (smart.hasOwnProperty('patient')) {
        var patient = smart.patient;
        var pt = patient.read();
        
        $.when(pt).fail(this.onError);
        $.when(pt).done(function(pat) {
            this.setState( {
                 isLoaded: true,
                 errorMsg: "",
                 patient: pat
            });
        }.bind(this));

      } else {
         this.onError();
      }
   }
   


  startToGetPatient() {
       window.FHIR.oauth2.ready(this.onPatientReady.bind(this), this.onError.bind(this));
  }

  reset() {
     this.setState( {
         isLoaded: false,
         errorMsg: "",
         patient: null
      }
     );
  }

  render() {
      var encounters = this.state.encounters;
      var errMsg = this.state.errorMsg;
      var pat = this.state.patient;
      var loaded = this.state.isLoaded;

      if(loaded===false) {
          if(errMsg.length ===0) {
              this.startToGetPatient();
              return (
               <div className="patient_app_container">
                  <img src={loadingImg} alt="loading..." />
               </div>
             );
         } else {
             return (
                <div className="patient_app_container">
                     Patient information could not be retrieved!
                </div>
             );
         }
      } else {
         if(pat !== null) {
             var fname = pat.name[0].given.join(' ');
             var lname = pat.name[0].family.join(' '); 
             return (
               <div className="patient_app_container">
                   <div>{fname} {lname}</div>
               </div>
             );
         } else {
             return (null);
         }
      }
  }

}


