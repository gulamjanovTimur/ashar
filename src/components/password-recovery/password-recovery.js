import React from 'react'


import './password-recovery.css'

const PasswordRecovery = (props) => {




   return (
      <div className='popup-fade'>
         <div className='passwordRecovery'>
            <div className='passwordRecovery-head'><div className='passwordRecovery-head-title'>Забыли свой пароль?</div>
               <div onClick={() => props.setPasRec(pasRec => pasRec = !pasRec)} className='cross-wrapper'>
               <span className='cross'></span>
               </div>
               
            </div>
            <div className='passwordRecovery-body'>
               <div className='password-recovery-body-description'>
                  Введите адрес электронной почты, который вы использовали при регистрации, и мы отправим вам ссылку для сброса пароля.
               </div>
               <input placeholder='Адрес электронной почты' className='password-recovery-body-input'></input>
               <button className='password-recovery-body-button'>Продолжить</button>
            </div>
         </div>
      </div>
   )
}




export default PasswordRecovery