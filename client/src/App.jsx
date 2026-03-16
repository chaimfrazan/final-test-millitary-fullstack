import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddLauncher from './pages/AddLauncher'
import LauncherDetails from './pages/LauncherDetails'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create/launcher' element={<AddLauncher />} />
        <Route path='/deatails/launcher/:id' element={<LauncherDetails />} />
      </Routes>
    </>
  )
}

export default App
