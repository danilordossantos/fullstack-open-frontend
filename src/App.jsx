import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import { Routes, Route, Link, Navigate, useNavigate, useMatch } from 'react-router-dom'
import BlogList from './components/BlogList'
import { Container, Box, AppBar, Toolbar, Button, Typography, CssBaseline } from '@mui/material'

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
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    blogService.setToken(user?.token)
  }, [user])

  const navigate = useNavigate()

  const notify = (text, type) => {
    setNotification({ text, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

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
      notify('Wrong credentials', 'error')
    }
  }

  const handleLogout = () => {

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    navigate('/login')
  }

  const handleCreateBlog = async blogObject => {

    try {
      const savedBlog = await blogService.create(blogObject)
      setBlogs(blog => blog.concat(savedBlog))
      notify('Success', 'success')
      navigate('/')
    } catch {
      notify('Something is wrong', 'error')
    }
  }

  const handleLike = async blogObject => {
    const updatedBlog = { ...blogObject, likes: blogObject.likes + 1, user: blogObject.user.id }
    try {
      const savedBlog = await blogService.update(blogObject.id, updatedBlog)
      setBlogs(blogs.map(blog => blogObject.id !== blog.id ? blog : savedBlog))
      notify('Success', 'success')
    } catch {
      notify('Something is wrong', 'error')
    }
  }

  const handleDelete = async blogObject => {
    try {
      await blogService.remove(blogObject.id)
      setBlogs(blogs.filter(blog => blogObject.id !== blog.id))
      notify('Success', 'success')
    } catch {
      notify('Something is wrong', 'error')
    }
  }

  const matchBlog = useMatch('/blogs/:id')

  const blog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  const matchLogin = useMatch('/login')

  return (
    <>
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar>
          {user && (
            <>
              <Button color='inherit' component={Link} to="/">home</Button>
              <Button color='inherit' component={Link} to="/create">new blog</Button>
            </>
          )}
          {!user && !matchLogin && <Button color='inherit' component={Link} to="/login">login</Button>}
          <Box sx={{ flexGrow: 1 }} />
          {user && (
            <>
              <Typography>{user.name} logged in</Typography>
              <Button color='inherit' onClick={handleLogout}>logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container>
        <Notification notification={notification} />

        <Box sx={{ mt: 2 }}>
          <Routes>
            <Route path='/' element={user ?
              <div>
                <BlogList blogs={blogs} />
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
        </Box>
      </Container>
    </>
  )
}

export default App