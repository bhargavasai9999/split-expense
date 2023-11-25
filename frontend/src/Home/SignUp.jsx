import 'bootstrap/dist/css/bootstrap.css';
import './module.home.css';
import { FcGoogle } from "react-icons/fc";
import { useState } from 'react';

export const SignUp = () => {
const [signup,setsignup]=useState({
  name:"",
  email:"",
  password:"",
  confirm:""
})
const [password_match,setpassword_match]=useState(null);
const handleChange=e=>{
  setsignup({...signup,[e.target.name]:e.target.value});
}

const handlesubmit=e=>{
  e.preventDefault();
  if(signup.password===signup.confirm){
    setpassword_match(true);
  }
  else{
    setpassword_match(false);
    return
  }

  console.log(signup)
  setsignup({
    name:"",
    email:"",
    password:"",
    confirm:""
  })
  setpassword_match(null);
}

  return (
    <div className=' p-2 text-center'>
      <div className='d-flex justify-content-center'>
        <form onSubmit={handlesubmit}>
        <h2 className='text-center'>SignUp Here</h2>
        <label className='login-label'> Email</label>
        <input type="email" placeholder='Email' className='p-2 text-start login-input shadow' name="email" value={signup.email} onChange={handleChange} required /><br/>
        <label className='login-label'> Name </label>
        <input type="text" placeholder='Full Name' className='p-2 text-start login-input shadow' name="name"  value={signup.name}  onChange={handleChange}  required />
        <label className='login-label'> Password </label>
        <input type="password" placeholder='password' className='p-2 text-start login-input shadow' name="password"  value={signup.password}  onChange={handleChange}  required /><br/>
        <label className='login-label'> Confirm password </label>
        <input type="text" placeholder='confirm password' className='p-2 text-start login-input shadow' name="confirm" value={signup.confirm} onChange={handleChange} required /><br/>
        {password_match===false && <p className='text-start pt-1 m-0'>password not matched</p>}
        <input type="submit" className='btn text-center mt-3 input-button shadow' value="Sign Up" />
        </form>
      </div>

      <p className='text-center'>------ or -------</p>

      <a href="#" className="m-0">
          <button className='btn text-center input-button bg-light shadow'><FcGoogle size={30}/> Login with Google</button>
        </a>
    </div>
  )
}
