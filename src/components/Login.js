import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {
      let navigate = useNavigate();
        const [email,setEmail] = useState("");
        const [password,setPassword] = useState("");

        console.log(email)
        console.log(password)

      const authentication = async (e) => {
            e.preventDefault();

            const response = await axios.post("http://localhost:4000/api/login",{
                  email,password
              },{"headers":{
                  "Content-Type": 'application/json'
              }})

            console.log(response)

            if(response.data.success){
                  localStorage.setItem('token',response.data.authtoken)
                  navigate("/");
            }
      }

  return (
    <div>
          <form onSubmit={authentication} className="mx-3">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={(e)=>{setEmail(e.target.value)}} aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                
          </form>
    </div>
  )
}

export default Login
