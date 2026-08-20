import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect, test } from 'vitest'

test('renders title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Kent C. Dodds',
    url: 'https://testing-library.com',
    likes: 5,
    user: {
      username: 'abranches',
      name: 'Danilo Abranches',
      id: '6a6ac09cd98eface3eb2201b'
    }
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
  expect(div).toHaveTextContent('Kent C. Dodds')
})
test('does not render url or likes by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Kent C. Dodds',
    url: 'https://testing-library.com',
    likes: 5,
    user: {
      username: 'abranches',
      name: 'Danilo Abranches',
      id: '6a6ac09cd98eface3eb2201b'
    }
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.togglableContent')
  expect(div).not.toBeVisible()

})