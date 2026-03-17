import { addRocket } from '../../api/axios.js'
import { useState } from 'react'

function AddLauncher() {
    const [launcher, setLauncher] = useState({
        name: '',
        rocketType: '',
        latitude: 0,
        longitude: 0,
        city: ''
    })
    const [loading, setLoading] = useState()
    const [message, setMessage] = useState('')

    const submit = async (e) => {
        e.preventDefault()
        try {
            console.log(launcher)
            const res = await addRocket(launcher);
            setMessage(res.data.message)
            console.log(res)
            setLauncher({
                name: '',
                rocketType: '',
                latitude: 0,
                longitude: 0,
                city: ''
            });
        } catch (err) {
            if (err.response) {
                setMessage(err.message)
            }
        } finally {
            setLoading(false);
        }
    }
    if (loading) {
        return <p>loading...</p>
    }

    return (
        <div>
            <h1 className='logo'>create launcher</h1>
            <form className='form' onSubmit={submit}>
                <label>name</label>
                <input
                    type="text"
                    value={launcher.name}
                    onChange={(e) => setLauncher((prev) => ({ ...prev, name: e.target.value }))}
                />
                <label>rocketType</label>
                <select
                    className='select'
                    value={launcher.rocketType}
                    onChange={(e) => setLauncher((prev) => ({ ...prev, rocketType: e.target.value }))}
                >
                    <option>choose rocket type...</option>
                    <option value="Kheibar">Kheibar</option>
                    <option value="Radwan">Radwan</option>
                    <option value="Fetah110">Fetah110</option>
                    <option value="Shahab3">Shahab3</option>
                </select>
                <label>latitude</label>
                <input
                    type="text"
                    value={launcher.latitude}
                    onChange={(e) => setLauncher((prev) => ({ ...prev, latitude: e.target.value }))}
                />
                <label>longitude</label>
                <input
                    type="text"
                    value={launcher.longitude}
                    onChange={(e) => setLauncher((prev) => ({ ...prev, longitude: e.target.value }))}
                />
                <label>city</label>
                <input
                    type="text"
                    value={launcher.city}
                    onChange={(e) => setLauncher((prev) => ({ ...prev, city: e.target.value }))}
                />
                <button className='submit' type='submit'>create</button>
                {message && (
                    <p>{message}</p>
                )}
            </form>
        </div>
    )

}
export default AddLauncher
