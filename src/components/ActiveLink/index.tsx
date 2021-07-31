import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router';

import { ReactElement, cloneElement } from 'react'

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}
// clone element do react clona qualquer elemento e adiciona uma propriedade através das opções do mesmo.
export function ActiveLink({ children, activeClassName, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter();
  const className = asPath === rest.href ? activeClassName : '';
  return (
    <Link {...rest}>
      {cloneElement(children, { className })}
    </Link>
  )
}
