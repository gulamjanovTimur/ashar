import React, { useEffect, useState } from 'react'
import AsharService from '../../../services/ashar-service'
import ItemCards from '../../item-card/item-cards'

import './main-page.css'

const MainPage = (props) => {

   const [activeCategory, setActiveCategory] = useState(false)
   const [category, setCategory] = useState([])
   const asharService = new AsharService()


   useEffect(() => {
      asharService.getAllCategory()
         .then(res => setCategory(res))
   }, [])


   const onClickCategoryItem = (item) => {
      props.setCategoryText(item.name)
   }
   
   const categoryArr = category.map((item) => {
      return (
         <div className='category-option' onClick={() => onClickCategoryItem(item)} key={item.name}>{item.name}</div>
      )
   })


   if(activeCategory){
      return (
         <div className='main-page'>
            <div onClick={()=>setActiveCategory(!activeCategory)} className='category-sort'>
               <div className='category-text'>{props.categoryText}</div>
               <div className='category-options'>
                  <div onClick={() => props.setCategoryText('Разделы')}  className='category-option'>Все</div>
                  {categoryArr}
               </div>
            </div>
            <ItemCards setCreateDone={props.setCreateDone} setCreateActive={props.setCreateActive} setCreateState={props.setCreateState} categoryText={props.categoryText} setCategoryText={props.setCategoryText} regionText={props.regionText} onClickTitleCard={props.onClickTitleCard} filter={props.filter} setFilter={props.setFilter} data={props.data} />
         </div>
      )
   }
   return (
      <div className='main-page'>
         <div onClick={()=>setActiveCategory(!activeCategory)} className='category-sort'>
            <div className='category-text'>{props.categoryText}</div>
         </div>
      <ItemCards setCreateDone={props.setCreateDone} setCreateActive={props.setCreateActive} setCreateState={props.setCreateState} categoryText={props.categoryText} setCategoryText={props.setCategoryText} regionText={props.regionText} onClickTitleCard={props.onClickTitleCard} filter={props.filter} setFilter={props.setFilter} data={props.data} />
      </div>
   )
}

export default MainPage