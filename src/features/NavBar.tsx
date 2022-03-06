import { Button } from '../components/Button'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { login, logout, selectUser } from '../redux/slices/example'
import { exampleUser } from '../types/User'

export const NavBar = () => {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  return (
    <nav className="bg-white h-16 border-b border-blue-300">
      <div className="container mx-auto h-full flex items-center justify-between">
        <h1 className="text-xl font-bold">Hello World!</h1>
        <div className="flex items-center">
          {user ? (
            <>
              <div className="text-lg px-4">Hello @{user.name}</div>
              <Button onClick={() => dispatch(logout())}>Logout</Button>
            </>
          ) : (
            <Button onClick={() => dispatch(login(exampleUser()))}>
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
