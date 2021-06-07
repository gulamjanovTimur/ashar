import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'


import AsharService from '../../../../services/ashar-service'
import './item-page-stat.css'

const ItemPageStat = (props) => {
   const [activeInfo, setActiveInfo] = useState(true)
   const [activeReport, setActiveReport] = useState(false)
   const [activeSponsors, setActiveSponsors] = useState(false)
   const [activeCosts, setActiveCosts] = useState(false)
   const [activeCostItem, setActiveCostItem] = useState(false)

   const [itemData,setItemData] = useState(undefined)
   const asharService = new AsharService()
   
      
   useEffect(() => {
      asharService.getCard(props.match.params.id)
         .then((result) => {
            result.find(item => {
               setItemData(item)
            })
         })
   }, [])








   let classNamesInfo = 'item-page-stat-info'
   let classNamesReport = 'item-page-stat-report'
   let classNamesSponsors = 'item-page-stat-sponsors'
   let classNamesCosts = 'item-page-stat-costs'
   if(activeInfo){
      classNamesInfo += ' activeTop'
   }
   if(activeReport){
      classNamesReport += ' activeTop'
   }
   if(activeSponsors){
      classNamesSponsors += ' activeBottom'
   }
   if(activeCosts){
      classNamesCosts += ' activeBottom'
   }
   const onClickInfo = () => {
      setActiveInfo(state => state = true)
      setActiveReport(state => state = false)
   }
   const onClickReport = () => {
      setActiveInfo(state => state = false)
      setActiveReport(state => state = true)
   }
   const onClickSponsors = () => {
      setActiveSponsors(state => state = true)
      setActiveCosts(state => state = false)
   }
   const onClickCosts = () => {
      setActiveSponsors(state => state = false)
      setActiveCosts(state => state = true)
   }
   const itemPageStatWrapper = () => {
      return (
         <>
            <div className='item-page-stat-wrapper'>
                  <div onClick={()=> onClickInfo()} className={classNamesInfo}>Информация</div>
                  <div onClick={()=> onClickReport()} className={classNamesReport}>Отчет</div>
               </div>
               <div className='item-page-stat-wrapper border'>
                  <div onClick={()=> onClickSponsors()} className={classNamesSponsors}>Спонсоры</div>
                  <div onClick={()=> onClickCosts()} className={classNamesCosts}>Расходы</div>
            </div>
         </>
      )
   }









   // const costInfoItem = item.costInfo.map((costInfoItem) => {
   //    return (
   //       <div key={costInfoItem.text} className='cost-info-item'>
   //          <div className='cost-info-item-text'>{costInfoItem.text}</div>
   //          <div className='cost-info-item-value'>{costInfoItem.value}</div>
   //       </div>
   //    )
   // })



   // const costInfoItem = itemData.costs[id].costInfo.map((costInfoItem) => {
   //    console.log(costInfoItem)
   // })











   const onClickCostItem = (item, id) => {
      setActiveCostItem(item => item = !activeCostItem)
      // console.log(item)
   }


   if(activeCostItem & activeReport & activeCosts){
      const costs = itemData?.costs.map((item, id) => {
         return (
         <>
            <div key={id} className='costs-item'>
               <span onClick={()=> {onClickCostItem(item, id)}} className='costs-item-text'>{item.text}
                  <i className='up'></i>
               </span>
               <span className='costs-item-cost'>{item.value} с</span>
            </div>
            <div  className='cost-info'>
               <div className='cost-info-item'>
                  <div className='cost-info-item-text'>text</div>
                  <div className='cost-info-item-value'>value</div>
               </div>
            </div>
         </>
         )
      })
   
   return (
      <div className='item-page-stat'>
         {itemPageStatWrapper()}
         <div className='costs-items'>
            {costs}
         </div>
      </div>
   )
   }
      
      
   if(activeCosts & activeReport){
         const costs = itemData?.cards_reports.map((item, id) => {
            return (
               <div key={id} className='costs-item'>
                  <span onClick={()=> {onClickCostItem(item)}} className='costs-item-text'>{item.text}
                     <i className='up'></i>
                  </span>
                  <span className='costs-item-cost'>{item.value} с</span>
               </div>
            )
         })
      
      return (
         <div className='item-page-stat'>
            {itemPageStatWrapper()}
            <div className='costs-items'>
               {costs}
            </div>
         </div>
      )
   }



   
















   if(activeReport & activeSponsors){
      const sponsors = itemData?.cards_reports.map((item, id) => {
         return (
            <div key={id} className='costs-item'>
               <span className='costs-item-text'>{item.name}</span><span className='costs-item-cost'>{item.value} с</span>
            </div>
         )
      })
      return (
         <div className='item-page-stat'>
            {itemPageStatWrapper()}
            <div className='costs-items'>
               {sponsors}
            </div>
         </div>
      )
   }
   if(activeInfo){
      return (
         <div className='item-page-stat'>
            <div className='item-page-stat-wrapper'>
               <div onClick={()=> onClickInfo()} className={classNamesInfo}>Информация</div>
               <div onClick={()=> onClickReport()} className={classNamesReport}>Отчет</div>
            </div>
            <div className='item-page-stat-info-page'>{itemData?.description}</div>
         </div>
      )
   }
   if(activeReport){
      return (
         <div className='item-page-stat'>
            {itemPageStatWrapper()}
         </div>
      )
   }
   return (
      <div className='item-page-stat'>
         <div className='item-page-stat-wrapper'>
            <div onClick={()=> onClickInfo()} className={classNamesInfo}>Информация</div>
            <div onClick={()=> onClickReport()} className={classNamesReport}>Отчет</div>
         </div>
      </div>
   )
   
}

export default withRouter(ItemPageStat)

