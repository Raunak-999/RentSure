import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import TopBar from '../../components/dashboard/TopBar';
import Sidebar from '../../components/dashboard/Sidebar';
import { motion } from 'framer-motion';
import { Home, CreditCard, Calendar, TrendingUp } from 'lucide-react';

interface RentPayment {
  id: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'overdue';
}

interface PropertyDetails {
  propertyName: string;
  address: string;
  monthlyRent: number;
  leaseStartDate: string;
  leaseEndDate: string;
  securityDeposit: number;
  landlordName: string;
  landlordEmail: string;
}

export default function TenantDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role !== 'tenant') {
      navigate('/landlord');
      return;
    }
  }, [user, navigate]);

  const property: PropertyDetails = {
    propertyName: 'Kothrud Apartment',
    address: '123 Kothrud Main Road, Pune 411038',
    monthlyRent: 22000,
    leaseStartDate: '2024-01-01',
    leaseEndDate: '2025-01-01',
    securityDeposit: 66000,
    landlordName: 'Mr. Rajesh Kumar',
    landlordEmail: 'rajesh.kumar@rentsure.com'
  };

  const recentPayments: RentPayment[] = [
    {
      id: '1',
      amount: 22000,
      date: '2024-02-01',
      status: 'paid'
    },
    {
      id: '2',
      amount: 22000,
      date: '2024-01-01',
      status: 'paid'
    },
    {
      id: '3',
      amount: 22000,
      date: '2024-03-01',
      status: 'pending'
    }
  ];

  const getStatusColor = (status: RentPayment['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'overdue':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateDaysLeft = () => {
    const today = new Date();
    const endDate = new Date(property.leaseEndDate);
    const diffTime = Math.abs(endDate.getTime() - today.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Sidebar />
      <div className="lg:ml-20 min-h-screen transition-all duration-300">
        <div className="p-8">
          <TopBar />
          
          <div className="mt-8">
            <h1 className="text-3xl font-bold text-white">Welcome, {user.email.split('@')[0]}</h1>
            <p className="text-gray-400 mt-1">Here's an overview of your rental status</p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Property Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <Home className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{property.propertyName}</h3>
                  <p className="text-sm text-gray-400 mt-1">{property.address}</p>
                </div>
              </div>
            </motion.div>

            {/* Monthly Rent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="p-6 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <CreditCard className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Monthly Rent</h3>
                  <p className="text-2xl font-bold text-white mt-1">₹{property.monthlyRent.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>

            {/* Lease Duration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="p-6 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <Calendar className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Lease Duration</h3>
                  <p className="text-sm text-gray-400 mt-1">{calculateDaysLeft()} days remaining</p>
                </div>
              </div>
            </motion.div>

            {/* Security Deposit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="p-6 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Security Deposit</h3>
                  <p className="text-2xl font-bold text-white mt-1">₹{property.securityDeposit.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Landlord Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="mt-8 p-6 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-white/10"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Landlord Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Name</p>
                <p className="text-white font-semibold mt-1">{property.landlordName}</p>
              </div>
              <div>
                <p className="text-gray-400">Email</p>
                <p className="text-white font-semibold mt-1">{property.landlordEmail}</p>
              </div>
            </div>
          </motion.div>

          {/* Recent Payments */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Recent Payments</h2>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Make Payment
              </motion.button>
            </div>

            <div className="mt-6 grid gap-4">
              {recentPayments.map(payment => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-gray-900/50 backdrop-blur-xl border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                        <CreditCard className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Rent Payment</p>
                        <p className="text-sm text-gray-400">{formatDate(payment.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-lg font-semibold text-white">₹{payment.amount.toLocaleString()}</p>
                      <div className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(payment.status)}`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
