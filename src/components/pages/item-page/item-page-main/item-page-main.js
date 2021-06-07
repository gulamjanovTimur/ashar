import React,{useEffect, useState} from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import AsharService from '../../../../services/ashar-service'

import './item-page-main.css'

const ItemPageMain = (props) => {
   const [itemData,setItemData] = useState(undefined)
   const asharService = new AsharService()
   
      
   useEffect(() => {
      asharService.getCard(props.match.params.id)
         .then((result) => {
            result.map(item => {
               setItemData(item)
            })
         })
   }, [])
   
   const precent =  Math.floor(itemData?.current_sum / itemData?.final_sum * 100)
   return (
      !itemData ? <h2>Loading</h2> :
      <div className='item-main'>
         <img alt='tualet' src={itemData?.cards_img[0].img} className='item-main-img'></img>
         <div className='item-main-info'>
            <div className='item-main-info-top'>
               <div className='item-main-info-value'>
                  <span className='item-main-info-currentValue'>Собрано {itemData?.current_sum} с</span> <span className='item-main-info-totalValue'>из {itemData?.final_sum} с</span>
               </div>
               <div className='item-main-info-percent'>{precent}%</div>
            </div>
            <div className='item-main-info-bottom'>
               <div className='item-main-info-sponsors'>
                  <span className='item-main-info-sponsors-value'>{itemData?.cards_reports.length}</span><span className='item-main-info-sponsors-text'>спонсора</span>
               </div>
               <div className='item-main-info-category'>{itemData?.section}</div>
               <Link to={`/item-page/${props.match.params.id}/donate`} className='item-main-info-button'>Сделать взнос</Link>
            </div>
         </div>
      </div>
   )
}

export default withRouter(ItemPageMain)
