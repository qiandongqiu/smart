import React from 'react';
//import ReactDOM from 'react-dom';
import $ from 'jquery';
import './econsult.css'
import loadingImg from './loading.gif'

export default class EconsultApp extends React.Component {
    constructor(props) {
       super(props);
    }


  render() {
         return (
           <div className='econsult_app_container'>
              <div> <span className="middle"> EConsult Module Placeholder </span> </div>
           </div>
         );
  }

}


