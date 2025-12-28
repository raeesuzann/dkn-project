import { useAuth } from '@/providers/auth.provider';
import { useGlobal } from '@/providers/global.provider';
import { LogOut, MenuIcon, User } from 'lucide-react';

function Navbar() {
  const { toggleSidebar } = useGlobal();
  const { logout } = useAuth();

  return (
    <div id="navbar" className="flex items-center justify-between p-3">
      <MenuIcon className="cursor-pointer" onClick={toggleSidebar} />
      <div className="flex items-center gap-4">
        <User className="cursor-pointer" />
        <div className="flex justify-between items-center">
          <button
            onClick={logout}
            className="bg-red-600 text-white p-2 rounded hover:bg-red-700"
          >
            <LogOut />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
