import { useGlobal } from '@/providers/global.provider';
import { Link } from '@tanstack/react-router';
import {
  Book,
  BookCheck,
  ChartScatter,
  Home,
  KanbanSquare,
  Users,
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const sidebarItems = [
  {
    icon: <Home size={20} />,
    title: 'Dashboard',
    link: '/dashboard',
  },
  {
    icon: <BookCheck />,
    title: 'Documents',
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
  {
    icon: <Book />,
    title: 'Awaiting Documents',
    link: '/awaiting-documents',
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
      <h3
        className={twMerge(
          'mt-8 mb-16 text-center text-2xl font-light',
          !isSidebarOpen && 'text-lg'
        )}
      >
        {isSidebarOpen ? 'DKN System' : 'DKN'}
      </h3>
      {sidebarItems.map((item) => (
        <Link
          key={item.title}
          to={item.link}
          className={twMerge(
            'flex items-center gap-2 mb-2 rounded-md hover:bg-gray-400 [&.active]:text-white [&.active]:bg-gray-600',
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
