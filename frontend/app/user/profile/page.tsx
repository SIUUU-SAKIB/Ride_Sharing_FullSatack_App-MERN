import BottomNav from '@/app/_components/Navigation/BottomNav'
import UserProfile from '@/app/_components/UserProfile'


const Profile = () => {
  const handleSignOut = () => {
    // TODO: implement sign out logic
  }

  const handleChangePassword = () => {
    // TODO: implement change password logic
  }

  return (
    <div>
      <nav></nav>
      <UserProfile onSignOut={handleSignOut} onChangePassword={handleChangePassword} />
      <BottomNav />
    </div>
  )
}

export default Profile