import React from 'react'
import ItemCards from '../../item-card/item-cards'

import './profile-favorites.css'

const ProfileFavorites = (props) => {
   return (
      <>
         <header className='profilePage-favorites-header'>
            <div className='container'>
               <h1>Избранные проекты</h1>
               <span>Вы получите два напоминания по электронной почте в течение последних 48 часов после завершения каждого проекта.</span>
            </div>
         </header>
         <div className='profilePage-favorites'>
            <div className='container'>
               <ItemCards setCreateDone={props.setCreateDone} setCreateActive={props.setCreateActive} setDeleteState={props.setDeleteState} categoryText={props.categoryText} setCategoryText={props.setCategoryText} regionText={props.regionText} onClickTitleCard={props.onClickTitleCard} filter={props.filter} setFilter={props.setFilter} data={props.data} />
            </div>
         </div>
      </>
   )
}

export default ProfileFavorites