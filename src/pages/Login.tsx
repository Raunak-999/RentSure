import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<'tenant' | 'landlord' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithEmail } = useAuth();

  const handleRoleSelect = (role: 'tenant' | 'landlord') => {
    setSelectedRole(role);
    setError(null);
  };

  const handleGoogleLogin = async () => {
    if (!selectedRole) return;
    setIsLoading(true);
    setError(null);
    try {
      await loginWithGoogle(selectedRole);
      navigate(`/${selectedRole}`);
    } catch (err) {
      console.error(err);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    if (!selectedRole) return;
    setIsLoading(true);
    setError(null);
    try {
      // For demo, using test accounts based on role
      const email = `test.${selectedRole}@rentsure.com`;
      const password = 'testpassword123';
      await loginWithEmail(email, password, selectedRole);
      navigate(`/${selectedRole}`);
    } catch (err) {
      console.error(err);
      setError('Failed to sign in with email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 p-8 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-white/10"
      >
        <div>
          <h2 className="text-center text-3xl font-bold text-white">Welcome to RentSure</h2>
          <p className="mt-2 text-center text-gray-400">
            {selectedRole ? 'Choose your sign in method' : 'Select your role to continue'}
          </p>
          {error && (
            <p className="mt-2 text-center text-red-400 text-sm">{error}</p>
          )}
        </div>

        {!selectedRole ? (
          <div className="grid grid-cols-2 gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect('tenant')}
              className="p-6 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-2">Tenant</h3>
              <p className="text-sm text-gray-400">Access your rental dashboard and manage payments</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect('landlord')}
              className="p-6 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-2">Landlord</h3>
              <p className="text-sm text-gray-400">Manage your properties and track rent collection</p>
            </motion.button>
          </div>
        ) : (
          <div className="space-y-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full p-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEmailLogin}
              disabled={isLoading}
              className="w-full p-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail className="w-5 h-5" />
              Sign in with Email
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={true}
              className="w-full p-4 rounded-lg bg-white/10 border border-white/20 text-white font-medium flex items-center justify-center gap-3 opacity-50 cursor-not-allowed"
            >
              <Phone className="w-5 h-5" />
              Sign in with Phone (Coming Soon)
            </motion.button>

            <button
              onClick={() => {
                setSelectedRole(null);
                setError(null);
              }}
              className="w-full text-sm text-gray-400 hover:text-white transition-colors mt-4"
            >
              ← Back to role selection
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}