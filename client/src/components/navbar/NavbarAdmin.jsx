import useUserContext from '../../provider/UserProvider'
import { useNavigate } from 'react-router-dom'


function NavbarAdmin() {
    const { user, logout } = useUserContext()
    const navigate = useNavigate()


    return (
        <div>
            <h3>{user.username} {user.user_type}</h3>
            <div className='navbar'>
                <button onClick={() => logout()}>logout</button>
                <button onClick={() => navigate("/create/launcher")}>craete launcher</button>
                <button onClick={() => navigate("/create/user")}>create / update user</button>
                <button onClick={() => navigate("/home/launcher")}>all launcher</button>
                <button onClick={() => navigate("/home/users")}>all users</button>
            </div>
        </div>
    )
}

export default NavbarAdmin
