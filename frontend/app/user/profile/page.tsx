import BottomNav from '@/app/_components/Navigation/BottomNav'
import Nav from '@/app/_components/Navigation/Nav'
import UserProfile from '@/app/_components/ui/UserProfile'

const Profile = () => {
  return (
    <div className='bg-zinc-200/40 min-h-screen'>
      <Nav/>
      <UserProfile />
      <BottomNav />
    </div>
  )
}

export default Profile