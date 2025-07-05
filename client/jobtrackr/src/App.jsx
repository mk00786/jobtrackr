import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/AddJob'
import Stats from './pages/Stats'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/add-job' element={<AddJob/>}/>
          <Route path='/stats' element={<Stats/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
