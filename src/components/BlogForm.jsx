import { useState } from 'react'
import { TextField, Button, Stack } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <TextField
            label="title"
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          />
          <TextField
            label="author"
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          />
          <TextField
            label="url"
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          />
          <Button type="submit" variant='contained'>save</Button>
        </Stack>
      </form>
    </div>
  )
}

export default BlogForm