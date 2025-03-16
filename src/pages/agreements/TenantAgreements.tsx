import { motion } from 'framer-motion';
import { FileText, Download, Eye, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import TopBar from '../../components/dashboard/TopBar';
import Sidebar from '../../components/dashboard/Sidebar';
import { useAuth } from '../../contexts/AuthContext';

interface Agreement {
  id: string;
  propertyName: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'pending';
  rentAmount: number;
  depositAmount: number;
  lastUpdated: string;
}

export default function TenantAgreements() {
  const { user } = useAuth();

  const agreements: Agreement[] = [
    {
      id: '1',
      propertyName: 'Kothrud Apartment',
      startDate: '2024-01-01',
      endDate: '2025-01-01',
      status: 'active',
      rentAmount: 22000,
      depositAmount: 66000,
      lastUpdated: '2024-01-01'
    },
    {
      id: '2',
      propertyName: 'Previous Apartment',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      status: 'expired',
      rentAmount: 20000,
      depositAmount: 60000,
      lastUpdated: '2023-12-31'
    }
  ];

  const getStatusColor = (status: Agreement['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'expired':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Sidebar />
      <div className={`lg:ml-20 min-h-screen transition-all duration-300 ${user?.role === 'tenant' ? 'lg:mr-4' : ''}`}>
        <div className="p-8">
          <TopBar />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Rental Agreements</h1>
              <p className="text-gray-400 mt-1">View and manage your rental agreements</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Request New Agreement
            </motion.button>
          </div>

          <div className="mt-8 grid gap-6">
            {agreements.map(agreement => (
              <motion.div
                key={agreement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-white/10"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <FileText className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{agreement.propertyName}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                          <Clock className="w-4 h-4" />
                          Last updated {formatDate(agreement.lastUpdated)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-gray-400 mb-1 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Duration
                        </div>
                        <div className="text-white">
                          {formatDate(agreement.startDate)} - {formatDate(agreement.endDate)}
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-gray-400 mb-1">Monthly Rent</div>
                        <div className="text-white">₹{agreement.rentAmount.toLocaleString()}</div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-gray-400 mb-1">Security Deposit</div>
                        <div className="text-white">₹{agreement.depositAmount.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                    <div className={`px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(agreement.status)}`}>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        {agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white"
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
