
export default class AsharService {
   
   _apiBase = 'https://ashar.club:444/api/v1'

   getResourse = async (url) => {
      const res = await fetch(`${this._apiBase}${url}`)
      if(!res.ok) {
         throw new Error(`Ошибка, адрес ${url}, не работает. ${res.status}`)
      }
      return res.json()
   }
   getAllCards = async () => {
      const res = await this.getResourse('/cards')
      return res.results.data
   }
   getCard = async (id) => {
      const res = await this.getResourse(`/cards/${id}`)
      return res.data
   }
   getAllRegions = async () => {
      const res = await this.getResourse('/regions')
      return res.data
   }
   getAllCategory = async () => {
      const res = await this.getResourse('/sections')
      return res.data
   }
   authorization = async (user, setAuthorized, rememberValue) => {
      const res = await fetch(`${this._apiBase}/login/`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(user)
      })
      if(res.status === 200){
         console.log('Пользователь найден!')
         res.json().then(res => {
            if(rememberValue){
               localStorage.setItem('token', res.token?.auth_token) 
               localStorage.setItem('userId', res.user_id)
               localStorage.setItem('userEmail', res.user_email)
            }else{
               sessionStorage.setItem('token', res.token?.auth_token) 
               sessionStorage.setItem('userId', res.user_id)
               sessionStorage.setItem('userEmail', res.user_email)
            }
         })
         setAuthorized(true)
      }
      else{
         console.log('Пользователь не найден.')
      }
      
      return res
   }
   logOut = (setIsLogged) => {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('userEmail')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userId')
      sessionStorage.removeItem('userEmail')
      setIsLogged(false)
   }
   addFavorite = async (id) => {
      if(sessionStorage.getItem('token')){
         const res = await fetch(`${this._apiBase}/cards/favorites/create`, {
            method: 'POST',
            headers: {
               "Authorization": `Token ${sessionStorage.getItem('token')}`,
               "Content-Type": 'application/json'},
            body: JSON.stringify({card: id})
         })
         return res
      }
      if(localStorage.getItem('token')){
         const res = await fetch(`${this._apiBase}/cards/favorites/create`, {
            method: 'POST',
            headers: {
               "Authorization": `Token ${localStorage.getItem('token')}`,
               "Content-Type": 'application/json'},
            body: JSON.stringify({card: id})
         })
         return res
      }
   }
   getAllFavorites = async () => {
      if(sessionStorage.getItem('token')){
         const res = await fetch(`${this._apiBase}/cards/favorites`, {
            headers: {
               "Authorization": `Token ${sessionStorage.getItem('token')}`,
               "Content-Type": 'application/json'},
         })
            .then(res => res.json())
         return res.results.data
      }
      if(localStorage.getItem('token')){
         const res = await fetch(`${this._apiBase}/cards/favorites`, {
            headers: {
               "Authorization": `Token ${localStorage.getItem('token')}`,
               "Content-Type": 'application/json'},
         })
            .then(res => res.json())
         return res.results.data
      }
   }
   deleteFavoriteItem = async (id) => {
      if(sessionStorage.getItem('token')){   
         const res = await fetch(`${this._apiBase}/cards/favorites/delete/${id}`, {
            method: 'DELETE',
            headers: {
               "Authorization": `Token ${sessionStorage.getItem('token')}`,
               "Content-Type": 'application/json'
            },
         })
         return res
      }
      if(localStorage.getItem('token')){
         const res = await fetch(`${this._apiBase}/cards/favorites/delete/${id}`, {
            method: 'DELETE',
            headers: {
               "Authorization": `Token ${localStorage.getItem('token')}`,
               "Content-Type": 'application/json'
            },
         })
         return res
      }
   }

   
}


// const user = {
//    password: 'timka250500',
//    email: 'gulamjanov4@gmail.com'
// }

const asharService = new AsharService()


console.log(asharService.getCard(15))