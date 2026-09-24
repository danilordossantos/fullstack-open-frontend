import { List, ListItemButton, ListItemText, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <Typography variant='h4'>Blogs</Typography>
      <List>
        {sortedBlogs.map(blog => (
          <ListItemButton
            key={blog.id}
            className='blog'
            component={Link}
            to={`/blogs/${blog.id}`}
            sx={{ bgcolor: 'grey.100', mb: 0.2, borderRadius: 1, '&:hover': { bgcolor: 'grey.300' } }}>
            <ListItemText primary={blog.title} />
          </ListItemButton>
        ))}
      </List>
    </div>
  )
}

export default BlogList