import UserContext from "./UserContext";
import React, { useState } from 'react'

const UserName = (props) => {
  const [username,setUsername] = useState("default");

  const getUsername = async () =>{

            const response = await fetch("http://localhost:4000/api/userdetails",{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token': localStorage.getItem('token')
                }
            }) 
           const user = await response.json();
        //    console.log(user);
           const name = user.name;
           setUsername(name);

        //    console.log(username);

  }

  return (
     <UserContext.Provider value={{username,getUsername}}>
        {props.children}
     </UserContext.Provider>
  )
}

export default UserName
