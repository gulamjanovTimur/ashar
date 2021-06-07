
import { Link } from 'react-router-dom'

import './registration.css'
import {googleSVG} from '../../../img'
import {facebookSVG} from '../../../img'


const RegistrationPage = () => {
   return (
      <div className='registration-page'>
         <div className='registration-haveAcc'>Уже есть аккаунт? <Link to='/authorization'>Войти</Link></div>
         <div className='registration-title'>Регистрация</div>
         <div className='registration-inputs'>
            <input placeholder='Имя' className='registration-input-item'></input>
            <input placeholder='Адрес электронной почты' className='registration-input-item'></input>
            <input placeholder='Пароль' className='registration-input-item'></input>
         </div>
         <button className='registration-btn-join'>Зарегистрироваться</button>
         <div className='registration-notification'>Регистрируясь, вы соглашаетесь с нашей <Link>Политикой конфиденциальности</Link>,<Link> Политикой использования файлов cookie</Link> и <Link>Условиями использования</Link>.</div>
         <div className='registration-and'>или</div>
         <div className='registration-btns-continue'>
            <button className='continue-item btn-google'><img className='continue-icon' alt='facebook-icon' src={googleSVG}></img>Продолжить с Google</button>
            <button className='continue-item btn-facebook'><img className='continue-icon' alt='facebook-icon' src={facebookSVG}></img> Продолжить с Facebook</button>
         </div>
      </div>
   )
}


export default RegistrationPage