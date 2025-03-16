import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Home,
  FileText,
  CreditCard,
  MessageSquare,
  Settings,
  LogOut,
  TrendingUp
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const tenantNavItems: NavItem[] = [
  { name: 'Dashboard', path: '/tenant', icon: Home },
  { name: 'Agreements', path: '/tenant/agreements', icon: FileText },
  { name: 'Payments', path: '/tenant/payments', icon: CreditCard },
  { name: 'Disputes', path: '/tenant/disputes', icon: MessageSquare }
];

const landlordNavItems: NavItem[] = [
  { name: 'Dashboard', path: '/landlord', icon: Home },
  { name: 'Agreements', path: '/landlord/agreements', icon: FileText },
  { name: 'Insights', path: '/landlord/insights', icon: TrendingUp },
  { name: 'Disputes', path: '/landlord/disputes', icon: MessageSquare }
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navItems = user?.role === 'tenant' ? tenantNavItems : landlordNavItems;

  const getInitials = (email: string) => {
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-20 m-0 flex flex-col bg-gray-900 text-white shadow-lg">
      <div className="relative flex items-center justify-center h-16 w-16 mt-4 mb-4 mx-2">
        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl font-semibold">
          {user ? getInitials(user.email) : ''}
        </div>
      </div>

      <div className="flex flex-col items-center mt-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-2 rounded-xl 
                ${isActive ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'hover:bg-white/10 text-gray-400 hover:text-white'}
                transition-all duration-300 ease-linear cursor-pointer`}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center"
              >
                <item.icon className="h-6 w-6" />
              </motion.div>
              {isActive && (
                <div className="absolute -right-2 w-1 h-8 rounded-l-lg bg-white" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col mt-auto mb-4">
        <Link
          to="/settings"
          className="flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 ease-linear cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center"
          >
            <Settings className="h-6 w-6" />
          </motion.div>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center h-12 w-12 mt-2 mb-2 mx-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 ease-linear cursor-pointer"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center"
          >
            <LogOut className="h-6 w-6" />
          </motion.div>
        </button>
      </div>
    </div>
  );
}
