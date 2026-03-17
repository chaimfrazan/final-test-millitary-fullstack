import { createUser, updateUser } from '../../api/axios.js'
import { useState } from 'react'

function Register() {
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    user_type: ''
  })
  const [loading, setLoading] = useState()
  const [messageCreate, setMessageCreate] = useState('')
  const [messageUpdate, setMessageUpdate] = useState('')

  const create = async (e) => {
    e.preventDefault()
    try {
      const res = await createUser(user);
      setMessageCreate(res.data.message)
      console.log(res)
      setUser({
        username: '',
        password: '',
        email: '',
        user_type: '',
      });
    } catch (err) {
      if (err.response) {
        setMessageCreate(err.message)
      }
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return <p>loading...</p>
  }

  const update = async (e) => {
    e.preventDefault()
    try {
      const res = await updateUser(user);
      setMessageUpdate(res.data.message)
      setUser({
        username: '',
        password: '',
        email: '',
        user_type: '',
      });
    } catch (err) {
      if (err.response) {
        setMessageUpdate(err.message)
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
      <h1 className='logo'>create user</h1>
      <form className='form' onSubmit={create}>
        <label>username</label>
        <input
          type="text"
          value={user.username}
          onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))}
        />
        <label>password</label>
        <input
          type="text"
          value={user.password}
          onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
        />
        <label>email</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
        />
        <label>user type</label>
        <input
          type="text"
          value={user.user_type}
          onChange={(e) => setUser((prev) => ({ ...prev, user_type: e.target.value }))}
        />
        <button className='submit' type='submit'>create</button>
        {messageCreate && (
          <p>{messageCreate}</p>
        )}
      </form>
      <h1 className='logo'>update user</h1>
      <form className='form' onSubmit={update}>
        <label>username</label>
        <input
          type="text"
          value={user.username}
          onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))}
        />
        <label>password</label>
        <input
          type="text"
          value={user.password}
          onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
        />
        <label>email</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
        />
        <label>user type</label>
        <input
          type="text"
          value={user.user_type}
          onChange={(e) => setUser((prev) => ({ ...prev, user_type: e.target.value }))}
        />
        <button className='submit' type='submit'>update</button>
        {messageUpdate && (
          <p>{messageUpdate}</p>
        )}
      </form>
    </div>
  )

}
export default Register
