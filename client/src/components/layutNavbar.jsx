import NavbarAdmin from './navbar/NavbarAdmin'
import { Outlet } from 'react-router-dom'
import NavbarUser from './navbar/NavbarUser'
import useUserContext from '../provider/UserProvider'

function LayutNavbar() {

    const { user } = useUserContext()

    return (
        <div>
            {user?.user_type == 'admin' ? (<NavbarAdmin />) : (<NavbarUser />)}
            <Outlet />
        </div>
    )
}

export default LayutNavbar
