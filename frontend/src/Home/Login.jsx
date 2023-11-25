import 'bootstrap/dist/css/bootstrap.css';
import './module.home.css';
import { FcGoogle } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa";
import { useState } from 'react';

export const Login = () => {
  const [logindetails,setlogindetails]=useState({
    email:"",
    password:""
  })

const handleChange=e=>{
  setlogindetails({...logindetails,[e.target.name]:e.target.value});
}

const handlesubmit=e=>{
  e.preventDefault();
  console.log(logindetails)
  setlogindetails({
    email:"",
    password:""
  })
}

const handleshowpassword=()=>{
  var x =document.getElementById('password');
  if(x.type==="password"){
    x.type="text"

  }
  else{
    x.type="password"
  }
}

  return (
    <div className=' p-3 text-center'>
      <div className='d-flex justify-content-center'>
        <form onSubmit={handlesubmit} autoComplete='on'>
        <h2 className='pt-2'>Login here</h2><br/>
        <label className='login-label pb-1'> Email</label>
        <input type="email" placeholder='Email' name="email" value={logindetails.email} onChange={handleChange} className='p-2 text-start login-input shadow' required /><br/><br/>
        <label className='login-label pb-1'> Password </label>
        <input type="password" id="password" placeholder='password' name="password" value={logindetails.password} onChange={handleChange} className='p-2 text-start login-input shadow' required /><br/>
        <h6 className='d-flex text-center pt-2'> <input type='checkbox' onClick={handleshowpassword}/> &nbsp; Show password</h6>
        <input type="submit" className='btn bg text-center mt-4 input-button shadow' value="Login" />
        
        </form>

      </div>
      <br/>
      <p className='text-center'>------ or -------</p>
      <a href="#" className="">
          <button className='btn text-center input-button bg-light shadow'><FcGoogle size={30}/> Login with Google</button>
        </a>
    </div>
  )
}
