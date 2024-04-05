import React from 'react'
import { useNavigate } from 'react-router';
function SignUp(props) {
  let navi = useNavigate();
  const handlesubmit=async(e)=>{
    var url="https://mern-notes-app-delta.vercel.app/";
    e.preventDefault();
    let email1=document.getElementById('InputEmail').value;
    let password1=document.getElementById('InputPassword').value;
    let name1=document.getElementById('InputName').value;
    console.log(email1);
    console.log(name1);
    console.log(password1);
    const response = await fetch(`${url}/api/auth/createuser`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name:name1,email:email1,password:password1}), 
      });
       const json=await response.json();
       if(json.success)
          {
             localStorage.setItem('token',json.jwtData);
             props.showalert("success", "SignUp Success");
             navi('/login');

          }
       else  
         {
          props.showalert("danger", json.error); 
         }   
}
    
  return (
    <div>
      <form onSubmit={handlesubmit}>
      <div className="mb-3 container">
    <label htmlFor="exampleInputname" className="form-label">Name</label>
    <input type="name" className="form-control" id="InputName" aria-describedby="emailHelp"/>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp"/>

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="InputPassword"/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  </div>
</form>
    </div>
  )
}

export default SignUp
