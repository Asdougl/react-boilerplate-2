import { PageLayout } from '../components/PageLayout'
import { UserTag } from '../features/UserTag'

export const Home = () => {
  return (
    <PageLayout>
      <div>Welcome Home :)</div>
      <div>
        Welcome to the home screen <UserTag />
      </div>
      <div>Your env var: {import.meta.env.VITE_API_URL}</div>
      <div>Your development mode: {import.meta.env.MODE}</div>
    </PageLayout>
  )
}
