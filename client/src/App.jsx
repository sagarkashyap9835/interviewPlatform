// import React, { useEffect } from 'react'
// import Home from './pages/Home'
// import Auth from './pages/Auth'
// import{Route, Routes} from 'react-router-dom'
// export const Serverurl="http://localhost:4000/"
// const App = () => {

//   return (
//     useEffect(() => {
//       const getUser=async()=>{
//         try {
//           const result=await axios.get(ServeruRl+"/api/user/current-user","withCredentia:trrue")
//         console.log(result.data)
//         } catch (error) {
          
//         }
//       }
//       getUser()
//     }, [third])
    
//     <Routes>
//       <Route path='/' element={<Home />} />
//       <Route path='/auth' element={<Auth />} />
//     </Routes>
//   )
// }

// export default App


import React, { useEffect } from 'react'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { Route, Routes } from 'react-router-dom'
import axios from 'axios'
import { setUserData } from './redux/userSlice'
import { useDispatch } from 'react-redux'
import InterviewPage from './pages/InterviewPage'
export const Serverurl = "http://localhost:4000/"

const App = () => {
const dispatch=useDispatch()
  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(Serverurl + "api/user/current-user", {
          withCredentials: true
        })
        // console.log(result.data)
       dispatch(setUserData(result.data.user))
      } catch (error) {
        console.error(error)
          dispatch(setUserData(null))
      }
    }
    getUser()
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/interview' element={<InterviewPage/>} />
    </Routes>
  )
}

export default App