import { FC } from 'react'

export const PageLayout: FC = ({ children }) => {
  return <main className="container mx-auto pt-6">{children}</main>
}
