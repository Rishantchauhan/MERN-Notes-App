import React, { useContext } from "react";
import { useNavigate } from 'react-router';
// import notecontext from "../Context/Notes/NoteContext";


function Login(props) {
    var url="https://mern-notes-app-delta.vercel.app/";
    let navi = useNavigate();
    // const {showalert}=useContext(notecontext);
    const handlesubmit=async(e)=>{
        e.preventDefault();
        let email1=document.getElementById('inputEmail').value;
        let password1=document.getElementById('inputPassword').value;
        const response = await fetch(`${url}/api/auth/login`, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:email1,password:password1}), 
          });
          // console.log(email1);
          //  console.log(password1);
           const json=await response.json();
           if(json.success)
              {
                 //redirect
                 localStorage.setItem('token',json.jwtData);
                 props.showalert("success","Login Success");
                 navi('/');

              }
           else  
             {
                props.showalert("danger", "Invalid Credentials");
                
             }   
          // console.log(json);
    }
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
    <form className="row g-3" onSubmit={handlesubmit}>
      <div className="col-auto">
        <label htmlFor="inputEmail" className="visually-hidden">Email</label>
        <input type="text" className="form-control" id="inputEmail" placeholder="Email" />
      </div>
      <div className="col-auto">
        <label htmlFor="inputPassword" className="visually-hidden">Password</label>
        <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-primary mb-3" >Confirm identity</button>
      </div>
    </form>
  </div>
  
   
  );
}

export default Login;
