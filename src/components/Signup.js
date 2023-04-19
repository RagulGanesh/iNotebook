import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

export const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate();
    const handleClick=async (e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name,email,password}),
        });
        const json = await response.json();
        if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authToken);
            navigate("/")
        }
        else{
            alert("Invalid credential!")
        }
        console.log(json);        
    }
  return (
    <div className="container">
        <form>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <input type="text" id="name" name="name" className="form-control" aria-describedby="emailHelp" value={name} onChange={e=>{setName(e.target.value)}}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" id="email" name="email" className="form-control" aria-describedby="emailHelp" value={email} onChange={e=>{setEmail(e.target.value)}}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" id="password" name="password" className="form-control" value={password} onChange={e=>{setPassword(e.target.value)}}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>
    </div>
  )
}
