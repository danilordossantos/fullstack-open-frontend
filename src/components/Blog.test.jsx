import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

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

test('shows url and likes when view button is clicked', async () => {
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

  const{ container } = render(
    <Blog blog={blog}/>
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.togglableContent')
  expect(div).toBeVisible()
})

test('clicking like button twice calls event handler twice', async () => {
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

  const mockHandleLike = vi.fn()

  render(
    <Blog blog={blog} handleLike={mockHandleLike}/>
  )

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandleLike.mock.calls).toHaveLength(2)
})