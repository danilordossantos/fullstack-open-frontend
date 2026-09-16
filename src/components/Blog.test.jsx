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

test('renders url and likes', async () => {
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
  expect(div).toHaveTextContent('https://testing-library.com')
  expect(div).toHaveTextContent('likes')
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
    <Blog blog={blog} handleLike={mockHandleLike} id={'6a6ac09cd98eface3eb2201b'}/>
  )

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandleLike.mock.calls).toHaveLength(2)
})

test('does not render like or remove buttons when user is not logged in', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Kent C. Dodds',
    url: 'https://testing-library.com',
    likes: 5,
    user: {
      username: 'abranches',
      name: 'Danilo Abranches'
    }
  }

  render(
    <Blog blog={blog} />
  )

  const likeButton = screen.queryByText('like')
  const removeButton = screen.queryByText('remove')
  expect(likeButton).toBeNull()
  expect(removeButton).toBeNull()
})

test('only renders like button for authenticated user who is not the owner', () => {
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

  render(
    <Blog blog={blog} id={'other-user-id-999'}/>
  )

  const likeButton = screen.getByText('like')
  const removeButton = screen.queryByText('remove')
  expect(likeButton).toBeVisible()
  expect(removeButton).toBeNull()
})