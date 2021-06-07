import React from 'react'

import './main.css'

const CreateNotification = (props) => {

   let classNames = 'create-notification '
   if(props.createActive){
      classNames += 'active'
   }
   if(props.createDone){
      classNames = 'create-notification '
   }
   
   return (
      <div className={classNames}>Проект был добавлен в избранное</div>
   )
}

export default CreateNotification