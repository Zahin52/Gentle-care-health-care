import React, { useState } from 'react'
import './register.css'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import useAuth from '../../context/useAuth'
import { updateProfile, getAuth } from '@firebase/auth'
export default function Register() {
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [pass, setPass] = useState('')
   const [error, setError] = useState('')
   const history = useHistory()
   const location = useLocation()
   const redirect = location.state?.from || '/'
   const { signInUsingGoogle, createNewUser } = useAuth()
   //    const handleSubmit = (e) => {
   //       e.preventDefault()
   //       if (pass.length < 6) {
   //          setError('Password must be more than 6 characters')
   //          return
   //       }
   //       createNewUser({ name, email, pass })
   //       console.log({ name, email, pass })
   //    }
   const setUserName = (name) => {
      const auth = getAuth()
      updateProfile(auth.currentUser, {
         displayName: name,
      })
         .then(() => {
            history.push(redirect)
         })
         .catch((e) => setError(e.message))
   }
   const handleCreateUser = (e) => {
      e.preventDefault()
      if (pass.length < 6) {
         setError('Password must be more than 6 characters')
         return
      }
      createNewUser({ email, pass })
         .then((result) => {
            setUserName(name)
            // setUser(result.user)
            // console.log(users)
         })
         .catch((e) => setError(e.message))
   }
   const handleGoogleLogin = () => {
      signInUsingGoogle()
         .then((result) => {
            history.push(redirect)
         })
         .catch((e) => setError(e.message))
   }
   return (
      <div className="form-wrapper">
         <div className="main-w3layouts wrapper">
            <h1> SignUp Form</h1>
            <div className="main-agileinfo">
               <div className="agileits-top">
                  <form>
                     <input
                        className="text w-100"
                        type="text"
                        name="Username"
                        placeholder="Username"
                        required
                        onChange={(event) => setName(event.target.value)}
                     />
                     <input
                        className="text email w-100"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={(event) => setEmail(event.target.value)}
                     />
                     <input
                        className="text w-100"
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={(event) => setPass(event.target.value)}
                     />

                     <input
                        type="submit"
                        onClick={(e) => handleCreateUser(e)}
                        value="SIGNUP"
                     />
                  </form>
                  <p className="text-white">{error}</p>
                  <p className="text-white">Register with google </p>
                  <ul className="social-network social-circle d-flex justify-content-center">
                     <li>
                        <a
                           onClick={handleGoogleLogin}
                           className="icoGoogle"
                           title="Google +"
                           href
                        >
                           <i className="fa fa-google-plus"></i>
                        </a>
                     </li>
                  </ul>
                  <p>
                     Have an Account? <NavLink to="/login"> Login Now!</NavLink>
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}
