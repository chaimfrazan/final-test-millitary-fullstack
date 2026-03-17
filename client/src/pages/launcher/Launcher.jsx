import { useEffect, useState } from 'react'
import { allRocket } from '../../api/axios.js'
import { useNavigate } from 'react-router-dom'

function Launcher() {
    const [launchers, setLounchers] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchCity, setSearchCity] = useState('')
    const [filterType, setFilterType] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        async function allLaunchers() {
            try {
                const res = await allRocket();
                setLounchers(res.data.rockets);
            } catch (err) {
                if (err.response) {
                    setMessage(err.message)
                }
            } finally {
                setLoading(false);
            }
        }
        allLaunchers();
    }, []);



    const filtered = launchers.filter((launcher) => {
        const searchByCity = launcher.city.includes(searchCity)
        const searchRocketType = filterType === "" || launcher.rocketType === filterType
        return searchByCity && searchRocketType
    })
    if (loading) {
        return <p>loading...</p>
    }

    return (
        <div>
            <h1 className='logo'>all the launchers</h1>
            <div className='filter-bar'>
                <input
                    className='search-input'
                    type="text"
                    placeholder='search by city...'
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                />
                <select
                    className='search-select'
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value=''>search rocket type...</option>
                    <option value="Kheibar">Kheibar</option>
                    <option value="Radwan">Radwan</option>
                    <option value="Fetah110">Fetah110</option>
                    <option value="Shahab3">Shahab3</option>
                </select>
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
                    {filtered.map((launcher) => (
                        <tr key={launcher._id}>
                            <td>{launcher._id}</td>
                            <td>{launcher.name}</td>
                            <td>{launcher.rocketType}</td>
                            <td> {launcher.latitude} </td>
                            <td>{launcher.longitude}</td>
                            <td>{launcher.city}</td>
                            <td> <button onClick={() => navigate(`/details/launcher/${launcher._id}`)}>details</button> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Launcher
