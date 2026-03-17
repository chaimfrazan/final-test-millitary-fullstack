import './App.css'
import { Route, Routes } from 'react-router-dom'
import Launcher from './pages/launcher/Launcher'
import AddLauncher from './pages/launcher/AddLauncher'
import LauncherDetails from './pages/launcher/LauncherDetails'
import Login from './pages/user/Login'
import Register from './pages/user/Register'
import ProtectedRoute from './components/ProtectRout'
import Users from './pages/user/Users'
import UserDetails from './pages/user/UserDetails'
import LayutNavbar from './components/layutNavbar'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />

        <Route element={<LayutNavbar />}>
          <Route element={<ProtectedRoute usersType={['airForce', 'intelligence', 'admin']} />}>
            <Route path='/home/launcher' element={<Launcher />} />
          </Route>

          <Route element={<ProtectedRoute usersType={['admin', 'intelligence']} />}>
            <Route path='/create/launcher' element={<AddLauncher />} />
            <Route path='/details/launcher/:id' element={<LauncherDetails />} />
          </Route>

          <Route element={<ProtectedRoute usersType={['admin']} />}>
            <Route path='/home/users' element={<Users />} />
            <Route path='/create/user' element={<Register />} />
            <Route path='/details/user/:id' element={<UserDetails />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
