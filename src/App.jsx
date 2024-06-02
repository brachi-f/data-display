import { useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AddLink from './links/AddLink.jsx'
import LinksList from './links/LinksList.jsx'
import { useDispatch, useSelector } from 'react-redux'
import * as linkService from './services/linkService.jsx'
import * as actions from './store/action.jsx'
import LinkDetails from './links/LinkDetails.jsx'
import Charts from './charts/Charts.jsx'
import GraphOptionMenu from './charts/GraphOptionMenu.jsx'

function App() {
  const user = useSelector(s => s.user)
  const dispatch = useDispatch()
  useEffect(() => {
    if (user)
      linkService.getUserLinks(user.id).then(res =>
        dispatch({ type: actions.SETLINKS, data: res.data })
      ).catch(e => console.error(e.message))
  }, [user])
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/add-link' element={<AddLink />} />
        <Route path="/links" element={<LinksList />} />
        <Route path='/links/:id' element={<LinkDetails />} />
        <Route path='/data-analysis' element={<GraphOptionMenu />} />
      </Routes>
    </>
  )
}

export default App
