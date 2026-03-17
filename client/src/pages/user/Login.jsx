import { login } from '../../api/axios.js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserContext from '../../provider/UserProvider.jsx'

function Login() {
    const { setUser, loading } = useUserContext()

    const [userForm, setUserForm] = useState({
        username: '',
        password: '',
    })
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const submit = async (e) => {
        e.preventDefault()
        try {
            const res = await login(userForm);
            console.log(res)
            const user = res.data.user
            const token = res.data.token
            setUser(user);
            localStorage.setItem('token', token)
            setMessage(`${res.data.message}`)

            setTimeout(() => {
                if (user.user_type === 'admin') {
                    navigate('/home/users')
                }
                else {
                    navigate('/home/launcher')
                }
            }, 1500)


        } catch (err) {
            if (err.response) {
                setMessage(err.message)
            }
        }
    }

    return (
        <div>
            <h1 className='logo'>welcome</h1>
            <div className='navbar'>
            </div>
            <form className='form' onSubmit={submit}>
                <label>username</label>
                <input
                    type="text"
                    value={userForm.username}
                    onChange={(e) => setUserForm((prev) => ({ ...prev, username: e.target.value }))}
                />

                <label>password</label>
                <input
                    type="password"
                    value={userForm.password}
                    onChange={(e) => setUserForm((prev) => ({ ...prev, password: e.target.value }))}
                />
                <button className='submit' type='submit' disabled={loading}>login</button>
                {message && (
                    <p>{message}</p>
                )}
            </form>
        </div>
    )

}
export default Login
