import React from 'react'
import { useContext } from 'react';
import AlertContext from '../Context/alertContext/alertContext';

const capitalize = (word)=>{
  if(word==="danger"){
    word="error";
  }
    const lower =word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function Alert() {

    const context = useContext(AlertContext);

    const {alert} = context;


  return (

       <div style={{height: '20px'}}>
       { alert && <div className={`alert alert-${alert.type} alert-dismissible fade show p-1`} role="alert">
            
            <strong>{capitalize(alert.type)}!</strong> {alert.msg}
        </div>}

      </div>
      
  )
}

export default Alert