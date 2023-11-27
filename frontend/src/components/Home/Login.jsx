import 'bootstrap/dist/css/bootstrap.css';
import './module.home.css';
import { FcGoogle } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa";
import { useState } from 'react';
import api from '../../apis/axiosConfig';
export const Login = ({ setAuthentication }) => {
  const [logindetails, setlogindetails] = useState({
    email: "",
    password: ""
  });
 

  const handleChange = (e) => {
    setlogindetails({ ...logindetails, [e.target.name]: e.target.value });
  };

  const handlesubmit = async(e) => {
    e.preventDefault();

    try {
      // Make a POST request to your login API endpoint
      const response = await api.post('/login',  {
        email: logindetails.email,
        password: logindetails.password,
      });

      // Handle the response from the server
      console.log(response.data); // Log the server response
      const jwtToken = response.data.jwtToken;

      // Save JWT token and user details to localStorage
      localStorage.setItem('jwtToken', jwtToken);
      localStorage.setItem('userDetails', JSON.stringify(response.data.userDetails));

      // Assuming the server returns a JWT token upon successful login
      // You may want to save the token in the client's state or localStorage for further authentication

      // For simplicity, let's assume setting authentication status to true upon successful login
      setAuthentication(true);

      // Redirect to another page if needed
      // For example, using react-router-dom
      // history.push('/dashboard');
    } catch (error) {
      // Handle error responses from the server
      console.error('Login failed:', error.response.data);

      // For simplicity, setting authentication status to false upon failed login
      setAuthentication(false);
    }

    // Reset login details
    setlogindetails({
      email: '',
      password: '',
    });
  };


  const handleshowpassword = () => {
    var x = document.getElementById('password');
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  return (
    //Login UI Code
    <div className='p-3 text-center'>
      <div className='d-flex justify-content-center'>
        <form onSubmit={handlesubmit} autoComplete='on'>
          <h2 className='pt-2'>Login here</h2><br />
          <label className='login-label pb-1'> Email</label>
          <input type="email" placeholder='Email' name="email" value={logindetails.email} onChange={handleChange} className='p-2 text-start login-input shadow' required /><br /><br />
          <label className='login-label pb-1'> Password </label>
          <input type="password" id="password" placeholder='password' name="password" value={logindetails.password} onChange={handleChange} className='p-2 text-start login-input shadow' required /><br />
          <h6 className='d-flex text-center pt-2'> <input type='checkbox' onClick={handleshowpassword} /> &nbsp; Show password</h6>
          <input type="submit" className='btn bg text-center mt-4 input-button shadow' value="Login" />

        </form>

      </div>
      <br />
      <p className='text-center'>------ or -------</p>

      {/* Google authentication in login */}
      <a href="#" className="">
        <button className='btn text-center input-button bg-light shadow'><FcGoogle size={30} /> Login with Google</button>
      </a>
    </div>
  )
}
