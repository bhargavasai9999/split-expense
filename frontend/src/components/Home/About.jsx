import 'bootstrap/dist/css/bootstrap.css'
import './module.home.css'
import { Login } from './Login'
import { useState } from 'react'
import { SignUp } from './SignUp'
import { RiLoginCircleLine } from 'react-icons/ri'
import { LuUserPlus2 } from 'react-icons/lu'
import { googleOauthPopup } from '../../firebase'

import { useToasts } from 'react-toast-notifications'

import api from '../../apis/axiosConfig'

const About = ({ setAuthentication }) => {
  const [login, setlogin] = useState(true)
  const { addToast } = useToasts()

  const handleGoogleOauth = async () => {
    try {
      const accessToken = await googleOauthPopup()
      const response = await api.post('/google-auth', {
        accessToken,
      })

      const jwtToken = response.data.jwtToken

      localStorage.setItem('jwtToken', jwtToken)
      localStorage.setItem(
        'userDetails',
        JSON.stringify(response.data.userDetails)
      )
      setAuthentication(true)
      addToast(response.data.message, { appearance: 'success' })
    } catch (error) {
      console.error('Login failed:', error.response.data)
      addToast(error.response.data.message, { appearance: 'error' })
      setAuthentication(false)
    }
  }

  return (
    //Info Page in login
    <div className="home-main d-flex col-12">
      <div className="about-main-container col-sm-12 col-md-6">
        <div className="about-container ">
          <img
            src="/src/static/logo.png"
            alt=""
            placeholder="Logo"
            className="logo-img"
          />
          <h2 className="d-inline p-3 text-white">Split Expense</h2>
          <div className="info-container ">
            <h1 className="info-heading">Hello there..!</h1>
            <h2 className="info-text">
              Split your expenses and bills with your friends
            </h2>
            <div className="info-buttons-container">
              <button
                className="btn bg-light ml-4 m43 input-button "
                onClick={() => setlogin(false)}
              >
                <LuUserPlus2 size={30} /> Sign Up
              </button>
              <button
                className="btn bg-light m-4 input-button  "
                onClick={() => setlogin(true)}
              >
                <RiLoginCircleLine size={30} /> Login
              </button>
            </div>
          </div>
        </div>
        <div className="auth-container">
          {/* login and signup ui */}
          {login ? (
            <Login
              setAuthentication={setAuthentication}
              handleGoogleOauth={handleGoogleOauth}
            />
          ) : (
            <SignUp handleGoogleOauth={handleGoogleOauth} />
          )}
        </div>
      </div>
    </div>
  )
}
export default About
