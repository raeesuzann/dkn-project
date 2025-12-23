import { useGlobal } from '@/providers/global.provider';
import { MenuIcon, User } from 'lucide-react';

function Navbar() {
  const { toggleSidebar } = useGlobal();
  return (
    <div id="navbar" className="flex items-center justify-between p-3">
      <MenuIcon className="cursor-pointer" onClick={toggleSidebar} />
      <User className="cursor-pointer" />
    </div>
  );
}

export default Navbar;
