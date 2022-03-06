import { useEffect } from 'react'
import { PageLayout } from '../components/PageLayout'
import { UserTag } from '../features/UserTag'

export const Home = () => {
  useEffect(() => {
    console.log(Math.random().toString(36).substring(2))
  })

  return (
    <PageLayout>
      <div>Welcome Home :)</div>
      <div>
        Welcome to the home screen <UserTag />
      </div>
    </PageLayout>
  )
}
