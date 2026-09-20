import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { Routes, Route, Link, Navigate, useNavigate, useMatch } from 'react-router-dom'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      return user
    }
    return null
  })
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    blogService.setToken(user?.token)
  }, [user])

  const navigate = useNavigate()

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreateBlog = async blogObject => {

    try {
      const savedBlog = await blogService.create(blogObject)
      setBlogs(blog => blog.concat(savedBlog))
      setSuccessMessage('Success')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      navigate('/')
    } catch {
      setErrorMessage('Something is wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async blogObject => {
    const updatedBlog = { ...blogObject, likes: blogObject.likes + 1, user: blogObject.user.id }
    try {
      const savedBlog = await blogService.update(blogObject.id, updatedBlog)
      setBlogs(blogs.map(blog => blogObject.id !== blog.id ? blog : savedBlog))
      setSuccessMessage('Success')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('Something is wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async blogObject => {
    try {
      await blogService.remove(blogObject.id)
      setBlogs(blogs.filter(blog => blogObject.id !== blog.id))
      setSuccessMessage('Success')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('Something is wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const padding = {
    padding: 5
  }

  const match = useMatch('/blogs/:id')

  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <Notification message={successMessage} />
      <Link style={padding} to='/'>home</Link>
      {!user && <Link style={padding} to='/login'>login</Link>}
      {user && <Link style={padding} to='/create'>new blog</Link>}

      <Routes>
        <Route path='/' element={user ?
          <div>
            <p>{user.name} logged in</p>
            <BlogList blogs={blogs} />
            <button type="button" onClick={handleLogout}>logout</button>
          </div>
          : <Navigate replace to='/login' />} />

        <Route path='/login' element={
          <div>
            <LoginForm username={username} password={password} handleUsernameChange={({ target }) => setUsername(target.value)} handlePasswordChange={({ target }) => setPassword(target.value)} handleSubmit={handleLogin} />
          </div>
        } />

        <Route path='/blogs/:id' element={
          <div>
            <Blog blog={blog} handleLike={handleLike} handleDelete={handleDelete} id={user?.id} />
          </div>
        } />

        <Route path='/create' element={
          <div>
            <BlogForm createBlog={handleCreateBlog} />
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App