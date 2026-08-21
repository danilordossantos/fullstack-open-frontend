import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import { expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

test('BlogForm calls createBlog with correct details when a new blog is created', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog}/>)

  const input1 = screen.getByLabelText('title')
  const input2 = screen.getByLabelText('author')
  const input3 = screen.getByLabelText('url')
  const sendButton = screen.getByText('save')

  await user.type(input1, 'Component testing is done with react-testing-library')
  await user.type(input2, 'Kent C. Dodds')
  await user.type(input3, 'https://testing-library.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Component testing is done with react-testing-library')
  expect(createBlog.mock.calls[0][0].author).toBe('Kent C. Dodds')
  expect(createBlog.mock.calls[0][0].url).toBe('https://testing-library.com')
})