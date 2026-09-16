const Blog = ({ blog, handleLike, id, handleDelete }) => {

  if (!blog) {
    return null
  }
  const isOwner = id && (id === blog.user.id)

  return (
    <div className='blog'>
      {blog.title} {blog.author}
      <div>{blog.url}</div>
      <div>{blog.user.name}</div>
      <div>likes {blog.likes}
        {
          id && (
            <button type="button" onClick={() => handleLike(blog)}>like</button>
          )
        }
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
    </div>
  )
}

export default Blog