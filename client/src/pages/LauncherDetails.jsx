import { useEffect, useState } from 'react'
import { getRocket ,deleteRocket} from '../api/axios.js'
import { useNavigate, useParams } from 'react-router-dom'

function LauncherDetails() {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [rocket, setRocket] = useState({})
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        async function rocketById() {
            try {
                const res = await getRocket(id)
                setRocket(res.data.rockets)
            } catch (err) {
                if (err.response) {
                    setMessage(err.message)
                }
            } finally {
                setLoading(false);
            }
        }
        rocketById()
    }, [id])


    const deleteByID = async () => {
        try {
            const res = await deleteRocket(id)
            console.log(res)
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
            <h1 className='logo'>the launcher details</h1>
            <div className='navbar'>
                <button onClick={() => navigate("/create/launcher")}>Add launcher</button>
                <button onClick={() => navigate("/")}>Home</button>
            </div>
            <table className="rockets-table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>rocketType</th>
                        <th>latitude</th>
                        <th>longitude</th>
                        <th>city</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={rocket.id}>
                        <td>{rocket.id}</td>
                        <td>{rocket.name}</td>
                        <td>{rocket.rocketType}</td>
                        <td> {rocket.latitude} </td>
                        <td>{rocket.longitude}</td>
                        <td>{rocket.city}</td>
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

export default LauncherDetails
