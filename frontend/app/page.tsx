
import BottomNav from "./_components/Navigation/BottomNav"
import Nav from "./_components/Navigation/Nav"
import HomeLayout from "./_components/home/HomeLayout"

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-zinc-900/20">
      <div className="relative min-h-screen max-w-xl mx-auto bg-[url('/main-bg.png')] bg-cover bg-center shadow-xl">
        
        <div className="absolute inset-0 bg-gray-100/50" />

        <div className="relative z-10 min-h-screen flex flex-col">
          <Nav />

          <main className="flex-1 overflow-y-auto px-4 py-8 pb-28">
            <HomeLayout />
          </main>

          <BottomNav />
        </div>

      </div>
    </div>
  );
};

export default HomePage