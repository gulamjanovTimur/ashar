import React, { useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { locationSVG } from '../../img'
import AsharService from '../../services/ashar-service'

import './header.css'

const Header = (props) => {
   const setFilter = props.setFilter

   const history = useHistory()
   const path = history.location.pathname
   const regExp = /\/item-page\/\d/


   const [itemData, setItemData] = useState(undefined)
   const asharService = new AsharService()
   
      
   useEffect(() => {
      if(regExp.test(path)){
         asharService.getCard(props.match.params.id)
         .then((result) => {
            result.map(item => {
               setItemData(item)
            })
         })
      }
   }, [path])

      



  if(path === '/'){
     return (
      <div className='header'>
         <div className='header-main-wrapper'>
         <Link onClick={()=> setFilter('during')}  to='/' className='header-main-item active-filter'>В процессе</Link>
         <Link onClick={()=> setFilter('new')} to='/new' className='header-main-item'>Новые</Link>
         <Link onClick={()=> setFilter('completed')} to='/completed' className='header-main-item'>Завершенные</Link>
         </div>
      </div>
     )
  }
  if(path === '/new'){
   return (
    <div className='header'>
       <div className='header-main-wrapper'>
       <Link onClick={()=> setFilter('during')} to='/' className='header-main-item'>В процессе</Link>
       <Link onClick={()=> setFilter('new')} to='/new' className='header-main-item active-filter'>Новые</Link>
       <Link onClick={()=> setFilter('completed')} to='/completed' className='header-main-item'>Завершенные</Link>
       </div>
    </div>
   )
   }
   if(path === '/completed'){
      return (
      <div className='header'>
         <div className='header-main-wrapper'>
         <Link onClick={()=> setFilter('during')} to='/' className='header-main-item'>В процессе</Link>
         <Link onClick={()=> setFilter('new')} to='/new' className='header-main-item'>Новые</Link>
         <Link onClick={()=> setFilter('completed')} to='/completed' className='header-main-item active-filter'>Завершенные</Link>
         </div>
      </div>
      )
   }

   if(regExp.test(path)){
      return (
         <div className='header'>
            <h1 className='header-title'>{itemData?.title}</h1>
            <h2 className='header-subtitle'><img src={locationSVG} alt='location-icon'></img>{itemData?.address}</h2>
         </div>
      )
   }
   
   return (
      <div className='header'>
      </div>
   )
}

export default withRouter(Header)

