import { useGlobal } from '@/providers/global.provider';
import { Link } from '@tanstack/react-router';
import { Book, ChartScatter, Home, KanbanSquare, Users } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const sidebarItems = [
  {
    icon: <Home size={20} />,
    title: 'Dashboard',
    link: '/dashboard',
  },
  {
    icon: <Book />,
    title: 'Contents',
    link: '/contents',
  },
  {
    icon: <KanbanSquare size={20} />,
    title: 'Leaderboard',
    link: '/leaderboard',
  },
  {
    icon: <ChartScatter size={20} />,
    title: 'Reports',
    link: '/reports',
  },
  {
    icon: <Users size={20} />,
    title: 'User Management',
    link: '/user-management',
  },
];

function Sidebar() {
  const { isSidebarOpen } = useGlobal();

  return (
    <div
      id="sidebar"
      className={twMerge(
        'flex flex-col shrink-0 transition delay-300',
        isSidebarOpen ? 'w-[250px] p-3' : 'w-[60px] p-2'
      )}
    >
      <h3 className="mt-8 mb-16 text-center text-2xl font-semibold">
        {isSidebarOpen ? 'DKN System' : 'DKN'}
      </h3>
      {sidebarItems.map((item) => (
        <Link
          to={item.link}
          className={twMerge(
            'flex items-center gap-2 mb-2 hover:bg-gray-400 hover:rounded-md',
            isSidebarOpen ? 'p-2' : 'justify-center p-3'
          )}
        >
          {item.icon}
          {isSidebarOpen && item.title}
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
