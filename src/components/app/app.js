import React, {useState, useEffect} from 'react'
import { Redirect, Route, Switch, useHistory } from 'react-router'


import './app.css'

import Nav from '../nav'
import Header from '../header'


import {ItemPage, MainPage, AuthorizationPage, ProfileFavorites} from '../pages'
import RegistrationPage from '../pages/registration/registration'
import PasswordRecovery from '../password-recovery/password-recovery'
import DonatePage from '../pages/donate-page/donate-page'
import { CreateNotification, DeleteNotification } from '../notification-favorite'



const App = () => {

   const [filter, setFilter] = useState('during')  //during, new, completed
   const [header, setHeader] = useState('/') // 2 варианта : '/' и /item-page
   const [pasRec, setPasRec] = useState(false) //modal-window
   const [regionText, setRegionText] = useState('Регионы') //7 регионов
   const [categoryText, setCategoryText] = useState('Разделы') //5 разделов

   const [isLogged, setIsLogged] = useState(false) //проверка авторизации


   const [createState, setCreateState] = useState(false) // уведомление о добавлении в избранное
   const [deleteState, setDeleteState] = useState(false) // уведомление о удалении из избранного

   const [createActive, setCreateActive] = useState(false) //анимация вниз
   const [createDone, setCreateDone] = useState(false) //анимация вверх

   const history = useHistory()
   const path = history.location.pathname
   


   const onClickTitleCard = (item) => {
      setFilter('/item-page')
      return item.title
   }

   useEffect(() => {
      if(localStorage.getItem('token') || sessionStorage.getItem('token')){
         setIsLogged(true)
      }
   }, [])



   
   
   


   return (
      <>
         {
            createState ?
               <CreateNotification createDone={createDone} createActive={createActive}/>

            : null
         }
         {
            deleteState ?
               <DeleteNotification createDone={createDone} createActive={createActive}/>

            : null
         }
         <Nav setIsLogged={setIsLogged} isLogged={isLogged} regionText={regionText} setRegionText={setRegionText} filter={filter} setFilter={setFilter}/>
         <Switch>
            <Route path={['/','/new','/completed']} exact>
               <Header setFilter={setFilter}/>
               <MainPage setCreateDone={setCreateDone} setCreateActive={setCreateActive} setCreateState={setCreateState} categoryText={categoryText} setCategoryText={setCategoryText} regionText={regionText} onClickTitleCard={onClickTitleCard} setFilter={setFilter}  filter={filter}/>
            </Route>
            <Route exact path={'/authorization'}>
               {
                  isLogged ?
                     <Redirect to='/' /> 
                  :
                     <AuthorizationPage isLogged={isLogged} setIsLogged={setIsLogged} pasRec={pasRec} setPasRec={setPasRec}/>
               }
            </Route>
            <Route exact path={'/registration'}>
               <RegistrationPage/>
            </Route>
            <Route exact path={'/authorization/password-recovery'}>
               <PasswordRecovery pasRec={pasRec} setPasRec={setPasRec}/>
            </Route>
            <Route exact path={`/item-page/:id`} >
               <Header setHeader={setHeader}  setFilter={setFilter}/>
               <ItemPage header={header} setHeader={setHeader}/>
            </Route>
            <Route exact path={'/item-page/:id/donate'}>
               <Header setHeader={setHeader} setFilter={setFilter}/>
               <DonatePage />
            </Route>
            <Route exact path={`/my-favorites`}>
               <ProfileFavorites setCreateDone={setCreateDone} setCreateActive={setCreateActive} setDeleteState={setDeleteState} categoryText={categoryText} setCategoryText={setCategoryText} regionText={regionText} onClickTitleCard={onClickTitleCard} filter={filter} setFilter={setFilter}  />
            </Route>
         </Switch>
      </>
   )
}

export default App