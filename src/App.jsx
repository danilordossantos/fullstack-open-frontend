import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {

    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreateBlog = async event => {
    event.preventDefault()

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blog => blog.concat(savedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
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

  const blogForm = () => (
    <form onSubmit={handleCreateBlog}>
      <div>
        <label>
          title
          <input type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)} />
        </label>
      </div>
      <div>
        <label>
          author
          <input type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </label>
      </div>
      <div>
        <label>
          url
          <input type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)} />
        </label>
      </div>
      <button type="submit">blog</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <Notification message={successMessage}/>

      {!user && <LoginForm username={username}
      password={password}
      handleUsernameChange={({target}) => setUsername(target.value)}
      handlePasswordChange={({target}) => setPassword(target.value)}
      handleSubmit={handleLogin}/>}
      {user && (
        <div>
          <p>{user.name} logged in</p>          
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          <button type="button" onClick={handleLogout}>logout</button>
        </div>
      )}
    </div>
  )
}

export default App