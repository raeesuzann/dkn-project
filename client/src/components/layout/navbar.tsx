import { useAuth } from '@/providers/auth.provider';
import { useGlobal } from '@/providers/global.provider';
import { useNavigate } from '@tanstack/react-router';
import { LogOut, MenuIcon, User } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const { toggleSidebar } = useGlobal();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  return (
    <div id="navbar" className="flex items-center justify-between p-3 border-b dark:border-gray-700 border-gray-300">
      <MenuIcon
        size={20}
        onClick={toggleSidebar}
        className="rounded cursor-pointer"
      />
      <div className="flex items-center gap-2">
        <button onClick={() => {}} className="p-2 rounded">
          <User size={18} className="cursor-pointer" />
        </button>
        <div className="flex justify-between items-center">
          <button onClick={handleLogout} className="p-2 rounded">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
