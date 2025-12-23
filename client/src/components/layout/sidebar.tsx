import { Link } from '@tanstack/react-router';
import { Book, ChartScatter, Home, KanbanSquare, Users } from 'lucide-react';

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
    icon: <Users size={20}/>,
    title: 'User Management',
    link: '/user-management',
  },
];

function Sidebar() {
  return (
    <div id="sidebar" className="flex flex-col w-[250px] shrink-0 p-3">
      <h3 className="mt-8 mb-16 text-center text-2xl font-semibold">
        DKN System
      </h3>
      {sidebarItems.map((item) => (
        <Link
          to={item.link}
          className="flex items-center gap-2 mb-2  hover:bg-gray-400 hover:rounded-md p-2"
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;
