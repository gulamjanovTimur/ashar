import React, {useEffect, useState} from 'react'
import { withRouter } from 'react-router'

import {bankCardSVG} from '../../../img'
import AsharService from '../../../services/ashar-service'

import './donate-page.css'
const DonatePage = (props) => {


   const [itemData, setItemData] = useState(undefined)
   const asharService = new AsharService()
   
      
   useEffect(() => {
      asharService.getCard(props.match.params.id)
         .then((result) => {
            result.find(item => {
               setItemData(item)
            })
         })
   }, [])
   
   return (
      <div className='donate-page'>
         <div className='donate-page-values'>
            <div className='donate-page-total-value'>{itemData?.final_sum} c</div>
            <div className='donate-page-currently-value'>собрано {itemData?.current_sum} с</div>
         </div>
         <div className='donate-wrapper'>
            <input className='donate-input' placeholder='Взнос'/>
            <span className='donate-text'>Способы оплаты:</span>
            <div className='donate-payment-ways'>
               <div className='donate-payment-ways-item'><img className='bankCardSVG' alt='bankCardSVG' src={bankCardSVG} />Оплата картой</div>
               <div className='donate-payment-ways-item'></div>
            </div>
            <span className='donate-text'>Номер карты</span>
            <input placeholder='Номер карты' className='donate-input'></input>
            <span className='donate-text'>Имя владельца карты: </span>
            <input placeholder='Имя владельца карты' className='donate-input'></input>
            <div className='donate-cardInfo'>
               <div className='donate-cardInfo-item'>
                  <span className='donate-text'>Срок истечения</span>
                  <input placeholder='MM/YY' className='donate-input'></input>
               </div>
               <div className='donate-cardInfo-item'>
                  <span className='donate-text'>Код безопасности</span>
                  <input placeholder='CVC' className='donate-input'></input>
               </div>
            </div>
            <div className='donate-inputCheckBox-wrapper'>
               <input type='checkbox' /><span className='donate-checkbox-text'>Запомнить эту карту для будущих взносов</span>
            </div>
            <button className='donate-btn'>Сделать взнос</button>
            <span className='donate-notification'>После успешной обработки вашей оплаты, вы получите электронное письмо с подтверждением на example@gmail.com</span>
         </div>
      </div>
   )
}

export default withRouter(DonatePage)