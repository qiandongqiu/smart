import React from 'react';
import ReactDOM from 'react-dom';
import fhir from 'fhirclient';
import './index.css'

function HelloWorld(props) {
    return (
       <div>{props.value}</div>
    );
}

ReactDOM.render(<HelloWorld value='hello dq' />, document.getElementById("mhn_root"));
