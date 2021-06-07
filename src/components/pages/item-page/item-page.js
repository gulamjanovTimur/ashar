import React from 'react'
import ItemPageMain from './item-page-main/item-page-main'
import ItemPageStat from './item-page-stat/item-page-stat'


import './item-page.css'

const ItemPage = (props) => {
   return (
      <div className='item-page'>
         <ItemPageMain header={props.header} setHeader={props.setHeader} data={props.data}/>
         <ItemPageStat header={props.header} setHeader={props.setHeader} data={props.data}/>
      </div>
   )
}

export default ItemPage