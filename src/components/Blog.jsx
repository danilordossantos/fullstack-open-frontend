import { Typography, Card, CardContent, CardActions, Link, Button } from '@mui/material'

const Blog = ({ blog, handleLike, id, handleDelete }) => {

  if (!blog) {
    return null
  }
  const isOwner = id && (id === blog.user.id)

  return (
    <Card className='blog'>
      <CardContent>
        <Typography variant='h5'>{blog.title}</Typography> <Typography variant='subtitle1'>{blog.author}</Typography>
        <Link href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</Link>
        <Typography variant='body2'>added by {blog.user.name}</Typography>
        <Typography variant='body2'>likes {blog.likes}</Typography>
      </CardContent>
      <CardActions>
        {
          id && (
            <Button onClick={() => handleLike(blog)}>like</Button>
          )
        }
        {
          isOwner && (
            <Button onClick={() => {
              if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
                handleDelete(blog)
              }
            }} color='error'>remove</Button>
          )
        }
      </CardActions>
    </Card>
  )
}

export default Blog