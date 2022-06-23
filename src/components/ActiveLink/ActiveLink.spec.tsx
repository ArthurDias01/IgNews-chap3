import { render } from '@testing-library/react'
import React from 'react'
import { ActiveLink } from '.'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe('Active Link component', () => {
  test('Active link renders correctly', () => {
    const { getByText } = render(
      <ActiveLink activeClassName='active' href='/'>
        <a>Home</a>
      </ActiveLink>
    )

    expect(getByText('Home')).toBeInTheDocument()
  })

  test('Active link is Receiving Active Class', () => {
    const { getByText } = render(
      <ActiveLink activeClassName='active' href='/'>
        <a>Home</a>
      </ActiveLink>
    )

    expect(getByText('Home')).toHaveClass('active')
  })
})
