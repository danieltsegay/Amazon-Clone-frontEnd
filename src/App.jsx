
import { useContext, useEffect, useState } from 'react'
import './App.css'
import Routing from './Router'
import { DataContext } from './components/DataProvider/DataProvider'
import { Type } from './Utility/action.type.js'
import { auth } from './Utility/firebase'


function App() {
  const [{user}, dispatch] = useContext(DataContext)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        console.log(authUser);
        dispatch({
          type: Type.SET_USER,
          user: authUser
        })
      }else{
        dispatch({
          type: Type.SET_USER,
          user: null,
        })
      }
      setIsLoading(false);
    })
  },[dispatch])
  if (isLoading) {
    return <div className="loading">Loading...</div>; // Show a loading indicator while waiting for auth state
  }
  return (
      <Routing/>
  )
}

export default App
