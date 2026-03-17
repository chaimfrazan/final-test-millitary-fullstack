import useUserContext from '../../provider/UserProvider'
import { useNavigate } from 'react-router-dom'


function NavbarUser() {
    const { user, logout } = useUserContext()
    const navigate = useNavigate()


    return (
        <div>
            <h3>{user.username} {user.user_type}</h3>
            <div className='navbar'>
                <button onClick={() => logout()}>logout</button>
                <button onClick={() => navigate("/create/launcher")}>add launcher</button>
                <button onClick={() => navigate("/home/launcher")}>all launcher</button>
            </div>
        </div>
    )
}

export default NavbarUser
