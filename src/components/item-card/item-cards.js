import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

import './item-cards.css'
import {locationSVG} from '../../img'
import AsharService from '../../services/ashar-service'

const ItemCards = (props) =>{
   const history = useHistory()
   const path = history.location.pathname
   const [data, setData] = useState([])
   const asharService = new AsharService()
      
   useEffect(() => {
      asharService.getAllCards().then((result) => {
         setData(result)
      })
   }, [])
   
   //филтр карточек по регионам
   const regionFilter = (arr) => {
      return arr.filter((item) => {
         if(item.region === props.regionText){
            return item
         }
         if(props.regionText === 'Регионы'){
            return item
         }
      })
   }
   //фильтр карточек по разделам
   const categoryFilter = (arr) => {
      return arr.filter((item) => {
         if(item.section === props.categoryText){
            return item
         }
         if(props.categoryText === 'Разделы'){
            return item
         }
      })
   }

   
   const onAddFavorite = (item) => {
      asharService.addFavorite(item.id)

      //анимация добавления в избранное
      setTimeout(() => {
         props.setCreateState(true)
      });

      setTimeout(() => {
         props.setCreateState(false)
      }, 3000);
      
      setTimeout(() => {
         props.setCreateActive(true)
      });
      setTimeout(() => {
         props.setCreateActive(false)
      }, 3000);
      
      setTimeout(() => {
         props.setCreateDone(true)
      }, 2600);
      setTimeout(() => {
         props.setCreateDone(false)
      }, 3000);

   }
   const onDeleteFavorite = (item) => {
      asharService.deleteFavoriteItem(item.id)

      //анимация удаления из избранного
      setTimeout(() => {
         props.setDeleteState(true)
      });

      setTimeout(() => {
         props.setDeleteState(false)
      }, 3000);
      
      setTimeout(() => {
         props.setCreateActive(true)
      });
      setTimeout(() => {
         props.setCreateActive(false)
      }, 3000);
      
      setTimeout(() => {
         props.setCreateDone(true)
      }, 2600);
      setTimeout(() => {
         props.setCreateDone(false)
      }, 3000);

   }
   
   

   

   


   const completedFilter = categoryFilter(regionFilter(data)).filter(item => item.current_sum >= item.final_sum)
   
   const itemsCardsCompleted = completedFilter.map((item,id) => {
      const img = completedFilter[id].cards_img[0].img
      const title = completedFilter[id].title
      const location = completedFilter[id].address
      const totalValue = completedFilter[id].final_sum
      const currentValue = completedFilter[id].current_sum
      const precentValue = Math.floor(currentValue / totalValue * 100)

      const divs = () => {
         return (
            <div key={id} className='item-card'>
               <img src={img} alt='item-card-img' className='item-card-img'></img>
               <div onClick={() => onAddFavorite(item)} className='item-card-favorite'>
                  <div className='item-card-favorite-icon'></div>
               </div>
               <Link onClick={()=>props.onClickTitleCard(item)} to={`/item-page/${item.id}`} className='item-card-title'>{title}</Link>
               <div className='item-card-location'><img className='item-card-locationSVG' alt='locationSVG' src={locationSVG} />  {location}</div>
               <div className='item-card-value-wrapper'>
                  <div className='item-card-value-items'>
                     <span className='item-card-totalValue'>{totalValue} с</span>
                     <span className='item-card-currentlyValue'>собрано {currentValue} с</span>
                  </div>
                  <div className='item-card-precent'>{precentValue}%</div>
               </div>
               <Link to={`/item-page/${item.id}/donate`} className='item-card-button'>Сделать взнос</Link>
            </div>
         )
      }

      
      if(item.region === props.regionText){
         return (
            divs()
         )
      }
      if(props.regionText === 'Регионы'){
         return (
            divs()
         )
      }
   })

   
   const newFilter = categoryFilter(regionFilter(data)).filter(item => item.process === 'Новый')
   
   const itemsCardsNew = newFilter.map((item,id) => {
      const img = newFilter[id].cards_img[0].img
      const title = newFilter[id].title
      const location = newFilter[id].address
      const totalValue = newFilter[id].final_sum
      const currentValue = newFilter[id].current_sum
      const precentValue = Math.floor(currentValue / totalValue * 100)

      const divs = () => {
         return (
            <div key={id} className='item-card'>
               <img src={img} alt='item-card-img' className='item-card-img'/>
               <div onClick={() => onAddFavorite(item)} className='item-card-favorite'>
                  <div className='item-card-favorite-icon'></div>
               </div>
               <Link onClick={()=>props.onClickTitleCard(item)} to={`/item-page/${item.id}`} className='item-card-title'>{title}</Link>
               <div className='item-card-location'><img className='item-card-locationSVG' alt='locationSVG' src={locationSVG} />{location}</div>
               <div className='item-card-value-wrapper'>
                  <div className='item-card-value-items'>
                     <span className='item-card-totalValue'>{totalValue} с</span>
                     <span className='item-card-currentlyValue'>собрано {currentValue} с</span>
                  </div>
                  <div className='item-card-precent'>{precentValue}%</div>
               </div>
               <Link to={`/item-page/${item.id}/donate`} className='item-card-button'>Сделать взнос</Link>
            </div>
         )
      }

      if(item.region === props.regionText){
         return (
            divs()
         )
         
      }
      if(props.regionText === 'Регионы'){
         return (
            divs()
         )
      }
   })


   const duringFilter = categoryFilter(regionFilter(data)).filter(item => item.current_sum  < item.final_sum)
   
   const itemsCardsDuring = duringFilter.map((item,id) => {
      const img = duringFilter[id].cards_img[0].img
      const title = duringFilter[id].title
      const location = duringFilter[id].address
      const totalValue = duringFilter[id].final_sum
      const currentValue = duringFilter[id].current_sum
      const precentValue = Math.floor(currentValue / totalValue * 100)

      const divs = () => {
         return (
            <div key={id} className='item-card'>
               <img src={img} alt='item-card-img' className='item-card-img'></img>
               <div onClick={() => onAddFavorite(item)} className='item-card-favorite'>
                  <div className='item-card-favorite-icon'></div>
               </div>
               <Link onClick={()=>props.onClickTitleCard(item)} to={`/item-page/${item.id}`} className='item-card-title'>{title}</Link>
               <div className='item-card-location'><img className='item-card-locationSVG' alt='locationSVG' src={locationSVG} />{location}</div>
               <div className='item-card-value-wrapper'>
                  <div className='item-card-value-items'>
                     <span className='item-card-totalValue'>{totalValue} с</span>
                     <span className='item-card-currentlyValue'>собрано {currentValue} с</span>
                  </div>
                  <div className='item-card-precent'>{precentValue}%</div>
               </div>
               <Link to={`/item-page/${item.id}/donate`} className='item-card-button'>Сделать взнос</Link>
            </div>
         )
      }
      return (
         divs()
      )
   })


      const [allFavorites, setAllFavorites] = useState([])

      useEffect(() => {
        return asharService.getAllFavorites().then((res) => {
           if(res === undefined){
              return setAllFavorites([])
           }
           return setAllFavorites(res)
        })
      }, [])

   
      const favoriteItems = allFavorites.map((item,id) => {
         const img = allFavorites[id].card.cards_img[0].img
         const title = allFavorites[id].card.title
         const location = allFavorites[id].card.address
         const totalValue = allFavorites[id].card.final_sum
         const currentValue = allFavorites[id].card.current_sum
         const precentValue = Math.floor(currentValue / totalValue * 100)
   
         const divs = () => {
            return (
               <div key={id} className='item-card'>
                  <img src={img} alt='item-card-img' className='item-card-img'></img>
                  <div onClick={() => onDeleteFavorite(item)} className='item-card-favorite favorite-active'>
                     <div className='item-card-favorite-icon'></div>
                  </div>
                  <Link onClick={()=>props.onClickTitleCard(item)} to={`/item-page/${item.card.id}`} className='item-card-title'>{title}</Link>
                  <div className='item-card-location'><img className='item-card-locationSVG' alt='locationSVG' src={locationSVG} />{location}</div>
                  <div className='item-card-value-wrapper'>
                     <div className='item-card-value-items'>
                        <span className='item-card-totalValue'>{totalValue} с</span>
                        <span className='item-card-currentlyValue'>собрано {currentValue} с</span>
                     </div>
                     <div className='item-card-precent'>{precentValue}%</div>
                  </div>
                  <Link to={`/item-page/${item.id}/donate`} className='item-card-button'>Сделать взнос</Link>
               </div>
            )
         }
         return (
            divs()
         )
      })
   

   if(path === '/my-favorites'){
      return (
         <div className='item-cards'>
            {favoriteItems}
         </div>
      )
      
   }


   if(path === '/completed'){
      return (
         <div className='item-cards'>
            {itemsCardsCompleted}
         </div>
      )
   }
   if(path === '/new'){
      return (
         <div className='item-cards'>
            {itemsCardsNew}
         </div>
      )
   }
   return (
      <div className='item-cards'>
         {itemsCardsDuring}
      </div>
      
   )
}

export default ItemCards