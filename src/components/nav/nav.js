import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { searchSVG, userSVG } from '../../img'
import AsharService from '../../services/ashar-service'


import './nav.css'

const Nav = (props) => {

   const [activeRegion, setActiveRegion] = useState(false)
   const [regions, setRegions] = useState([])
   const [profileActive, setProfileActive] = useState(false)
   

   const regionText = props.regionText
   const setRegionText = props.setRegionText

   const asharService = new AsharService()


   useEffect(() => {
      asharService.getAllRegions()
         .then((res) => {
            setRegions(res)
         })
   }, [])




   const regionsArr = regions.map((item, id) => {
      return (
         <div onClick={() => onClickRegionItem(item)} key={id} className='region-option'>{item.name}</div>
      )
   })


   const onClickRegionItem = (item) => {
      setRegionText(item.name)
   }

   const profileDivs = () => {
      return (
         <div onClick={() => setProfileActive(profileActive => !profileActive)}  className='nav-profile'>
            <div className='nav-profile-popup'>
               <span className='nav-profile-popupTitle'>Ваш аккаунт</span>
               <Link to='/my-favorites' className='nav-profile-item favoritesProject'>Избранные проекты</Link>
               <div className='nav-profile-item donateProject'>Поддержаные проекты</div>
               <div className='nav-profile-item profile'>Профиль</div>
               <div onClick={() => asharService.logOut(props.setIsLogged)} className='nav-profile-item logOut'>Выйти</div>
            </div>
         </div>
      )
   }

   if(activeRegion){
      if(props.isLogged){
         return (
            <div className='nav'>
            <div onClick={()=>setActiveRegion(!activeRegion)} className='region-sort'>
               <div id='region-text' className='region-text'>{regionText}</div>
               <div className='region-options'>
               <div onClick={() => setRegionText('Регионы')}  className='region-option'>Все</div>
                  {regionsArr}
               </div>
            </div>
            <Link onClick={() => props.setFilter('during')} to='/' className='nav-logo'>Ашар</Link>
            <div className='nav-menu'>
               {profileActive ? profileDivs() : <div onClick={() => setProfileActive(profileActive => !profileActive)} className='nav-profile'></div>}
            </div>
         </div>
         )
      }
      return (
         <div className='nav'>
            <div onClick={()=>setActiveRegion(!activeRegion)} className='region-sort'>
               <div id='region-text' className='region-text'>{regionText}</div>
               <div className='region-options'>
               <div onClick={() => setRegionText('Регионы')}  className='region-option'>Все</div>
                  {regionsArr}
               </div>
            </div>
            <Link onClick={() => props.setFilter('during')} to='/' className='nav-logo'>Ашар</Link>
            <div className='nav-menu'>
               <Link to='/authorization' className='nav-menu-joinAcc'>Войти</Link>   
            </div>
         </div>
      )
   }
   if(props.isLogged === true){
      return (
         <div className='nav'>
            <div onClick={()=> setActiveRegion(!activeRegion)} className='region-sort'>
               <div id='region-text' className='region-text'>{regionText}</div>
            </div>
            <Link onClick={() => props.setFilter('during')} to='/' className='nav-logo'>Ашар</Link>
            <div className='nav-menu'>
               
               {profileActive ? profileDivs() : <div onClick={() => setProfileActive(profileActive => !profileActive)} className='nav-profile'></div>}
            </div>
         </div>
      )
   }
   return (
      <div className='nav'>
         <div onClick={()=> setActiveRegion(!activeRegion)} className='region-sort'>
            <div id='region-text' className='region-text'>{regionText}</div>
         </div>
         <Link onClick={() => props.setFilter('during')} to='/' className='nav-logo'>Ашар</Link>
         <div className='nav-menu'>
            <Link to='/authorization' className='nav-menu-joinAcc'>Войти</Link>
         </div>
      </div>
   )
   
}

export default Nav