import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import Stats from './pages/Stats'
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import {ToastContainer} from 'react-toastify';
import NotFound from './pages/NotFound'
import EditJob from './pages/EditJob'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route element={<PrivateRoute/>}>
        <Route element={<Layout/>}>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/add-job' element={<AddJob/>}/>
          <Route path='/stats' element={<Stats/>}/>
          <Route path='/edit-job/:id' element={<EditJob/>} />
        </Route>
      </Route>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
    </>
  )
}

export default App
