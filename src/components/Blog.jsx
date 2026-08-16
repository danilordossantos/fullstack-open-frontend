import { useState } from 'react'

const Blog = ({ blog, handleLike, id, handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const isOwner = id === blog.user.id

  return (
    <div>
      {blog.title} {blog.author}
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>{blog.user.name}</div>
        <div>likes {blog.likes}
          <button type="button" onClick={() => handleLike(blog)}>like</button>
          {
            isOwner && (
              <button type="button" onClick={() => {
                if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
                  handleDelete(blog)
                }
              }}>remove</button>
            )
          }
        </div>
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )
}

export default Blog