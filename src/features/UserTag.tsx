import { useAppSelector } from '../redux/hooks'
import { selectUser } from '../redux/slices/example'

export const UserTag = () => {
  const user = useAppSelector(selectUser)

  return (
    <div className="font-mono bg-slate-100 px-1 rounded inline-block">
      {user ? `@${user.name}` : 'User Not Found'}
    </div>
  )
}
