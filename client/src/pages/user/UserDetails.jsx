import { useEffect, useState } from 'react'
import { getUser,deleteUser} from '../../api/axios.js'
import { useParams } from 'react-router-dom'

function UserDetails() {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})
    const [message, setMessage] = useState('')

    useEffect(() => {
        async function userById() {
            try {
                const res = await getUser(id)
                setUser(res.data.user)
            } catch (err) {
                if (err.response) {
                    setMessage(err.message)
                }
            } finally {
                setLoading(false);
            }
        }
        userById()
    }, [id])


    const deleteByID = async () => {
        try {
            const res = await deleteUser(id)
            setMessage(res.data.message)
        } catch (err) {
            if (err.response) {
                setMessage(err.message)
            }
        }
    }

    if (loading) {
        return <p>loading...</p>
    }

    return (
        <div>
            <h1 className='logo'>the users details</h1>
            <table className="rockets-table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>username</th>
                        <th>password</th>
                        <th>email</th>
                        <th>user type</th>
                        <th>last login</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                        <td> {user.email} </td>
                        <td>{user.user_type}</td>
                        <td>{user.last_login}</td>
                        <td> <button onClick={() => deleteByID()} >delete</button> </td>
                    </tr>
                </tbody>
            </table>
            {message && (
                <p className='message'>{message}</p>
            )}
        </div>
    )
}

export default UserDetails
