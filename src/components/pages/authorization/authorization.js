
import React, { useEffect, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'

import './authorization.css'
import {googleSVG} from '../../../img'
import {facebookSVG} from '../../../img'
import PasswordRecovery from '../../password-recovery/password-recovery'
import AsharService from '../../../services/ashar-service'



const AuthorizationPage = (props) => {
   const asharService = new AsharService()

   const [userData, setUserData] = useState({
      password: '',
      email: ''
   })
   const [rememberValue, setRememberValue] = useState(false)


   


   
   const onChangeInputs = () => {
      const authorizationValueEmail = document.getElementById('authorization-input-email').value
      const authorizationValuePassword = document.getElementById('authorization-input-password').value
      setUserData({password: authorizationValuePassword, email: authorizationValueEmail})
   }

   const onClickRememberMe = () => {
      setRememberValue(rememberValue => !rememberValue)
   }

   const authorizationPage = () => {
      return (
         <div className='authorization-page'>
            <div className='authorization-title'>Войти</div>
            <div className='authorization-inputs'>
               <input type='email' id='authorization-input-email' onChange={()=> onChangeInputs()} placeholder='Адрес электронной почты' className='authorization-input-item'></input>
               <input type='password' id ='authorization-input-password' onChange={()=> onChangeInputs()} placeholder='Пароль' className='authorization-input-item'></input>
            </div>
            <div onClick={() => props.setPasRec(pasRec => pasRec = !pasRec)} className='authorization-passwordRecovery'>Забыли свой пароль?</div>
            <button onClick={()=> asharService.authorization(userData, props.setIsLogged, rememberValue)}  className='authorization-btn-join'>Войти</button>
            <p><input value={rememberValue} onClick={()=> onClickRememberMe()} id='authorization-join-checkbox' className='authorization-join-checkbox' type='checkbox'></input>Запомнить меня</p>
            <div className='authorization-and'>или</div>
            <div className='authorization-btns-continue'>
               <button className='continue-item btn-google'><img className='continue-icon' alt='facebook-icon' src={googleSVG}></img>Продолжить с Google</button>
               <button className='continue-item btn-facebook'><img className='continue-icon' alt='facebook-icon' src={facebookSVG}></img> Продолжить с Facebook</button>
            </div>
            <div className='authorization-newUser'>Новый пользователь? <Link to='/registration'>Создать учетную запись</Link></div>
         </div>
      )
   }

   if(props.pasRec){
      return (
         <>
            {authorizationPage()}
            <PasswordRecovery setPasRec={props.setPasRec}/>
         </>
         
      )
   }
   return (
      <>
         {authorizationPage()}
      </>
   )
}


export default AuthorizationPage