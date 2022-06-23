import { render, screen } from '@testing-library/react'
import React from 'react'
import { Header } from '.'
import Image from 'next/image'
import logoImg from "../../../public/images/logo.svg";

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})


describe('Header component', () => {
  test('Header renders correctly', () => {
    render(
      <Header />
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Posts')).toBeInTheDocument()
  })
})
