import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// @ts-ignore
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Styles from './ForgetPassword.module.css';



const Content = () => {

      const [email, setEmail] = useState('');
      const [focused, setFocused] = useState(false);
      const [errorMessage, setErrorMessage] = useState('');


      const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const emailVal = e.target.value;
        setEmail(emailVal);
      }

      const focusHandler = () => {
          const emailError = "Email is not valid!"
          setFocused(true)
          setErrorMessage(emailError)
      }

      const blurHandler = () => {
        setFocused(false)
      }


      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        const url = 'http://localhost:4000/reset-password/enter-email';

        e.preventDefault(); 

        try {
          const body = { email };
          !body.email && NotificationManager.error('Email is required!');
          await axios.post('http://localhost:4000/reset-password/enter-email', body);
          NotificationManager.success(`Password Reset link sent to ${email}. Link will be valid for 15 min`);
          
        } catch (error: any) {
          error.message ? NotificationManager.error(error.response.data.msg) : NotificationManager.error("Something Went Wrong");
        }

      }

    return (

        <div className={Styles.content}>
        
              <div className={Styles.error}>
                    <NotificationContainer />
              </div>

              <form className={Styles.form} onSubmit={handleSubmit}>

                  <div className={Styles.forget_password_field}>
                    <p>Forget Password</p>
                  </div>
                
                  <div className={Styles.input_field}>
                    <p className={Styles.email_text}>
                      <label htmlFor='email'>Email Address</label>
                    </p>
                    <input 
                      className={Styles.email_input} 
                      type="email" 
                      id="email" 
                      value={email}
                      onChange={changeEmail}
                      onFocus={focusHandler}
                      onBlur={blurHandler}
                      autoComplete="off"
                      placeholder="Enter Email Address"
                      required
                    />
                    <p className={Styles.back_to_login}><Link to="/admin">Back To Login</Link></p>
                    {focused && (<span className={Styles.emailError}>{errorMessage}</span>)}
                  </div>
                  <button 
                    className={Styles.submit_button_field} 
                    type="submit">
                      <span className={Styles.send_text}>Send</span>
                  </button>
              </form>
      </div>
    ) 

}


export default Content;