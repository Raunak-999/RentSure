import { useAuth } from '../../contexts/AuthContext';

export interface TopBarProps {
  userName?: string;
  userRole?: string;
  city?: string;
}

export default function TopBar() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between p-4 bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl">
      <div>
        <h2 className="text-xl font-semibold text-white">
          Welcome, {user?.displayName || 'User'}
        </h2>
        <p className="text-gray-400">
          {user?.role || 'Guest'} • {user?.city || 'Location not set'}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-white">{new Date().toLocaleDateString()}</p>
          <p className="text-gray-400">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}
