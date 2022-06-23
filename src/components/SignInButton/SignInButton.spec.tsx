import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client';
import React from 'react'
import { SignInButton } from '.'


jest.mock('next-auth/client')

describe('SignIn Button component', () => {
  test('renders correctly when user is not Authenticated', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])
    render(
      <SignInButton />
    )
    expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument()
  })

  test('renders correctly when user is Authenticated', () => {

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([
      { user: { name: 'John Doe', email: 'john.doe@example.com' }, expires: 'fake-expires' },
      false])

    render(
      <SignInButton />
    )
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
