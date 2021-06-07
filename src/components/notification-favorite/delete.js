import React from 'react'

import './main.css'

const DeleteNotification = (props) => {

   let classNames = 'delete-notification '
   if(props.createActive){
      classNames += 'active'
   }
   if(props.createDone){
      classNames = 'delete-notification '
   }
   
   return (
      <div className={classNames}>Проект был удален из избранного</div>
   )
}

export default DeleteNotification