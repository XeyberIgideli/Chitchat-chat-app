import { useRoutes } from "react-router-dom"
import routes from './routes'
import { Toaster } from "react-hot-toast"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Loader } from "./components/Loader"
import { logout } from "config/_firebase"
function App() {

  const user = useSelector(state => state.auth.user)  
  const getRoutes = useRoutes(routes)
  const [redirect, setRedirect] = useState(false)
  
  useEffect(() => {

    setTimeout(() => {
      setRedirect(true)
    },1000)
  }, [])
 
   

  if(user && !redirect) { 
    return <Loader/>
  }
  
 return  (
    <>   
      <Toaster position="top-right"/>
      {getRoutes}
    </>
  )
}

export default App;
