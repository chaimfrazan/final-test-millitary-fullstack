import { useEffect, useState } from 'react'
import { allUsers } from '../../api/axios.js'
import { useNavigate } from 'react-router-dom'

function Users() {
    const [users, setsUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        async function getAllUsers() {
            try {
                const res = await allUsers();
                setsUsers(res.data.users);
            } catch (err) {
                if (err.response) {
                    setMessage(err.message)
                }
            } finally {
                setLoading(false);
            }
        }
        getAllUsers();
    }, []);

    if (loading) {
        return <p>loading...</p>
    }

    return (
        <div>
            <h1 className='logo'>all the users</h1>
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
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td> {user.email} </td>
                            <td>{user.user_type}</td>
                            <td>{user.last_login}</td>
                            <td> <button onClick={() => navigate(`/details/user/${user._id}`)}>details</button> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Users
