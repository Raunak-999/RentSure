import { motion } from 'framer-motion';
import { FileText, Download, Eye, Clock, Calendar, CheckCircle2, Plus, Search } from 'lucide-react';
import TopBar from '../../components/dashboard/TopBar';
import Sidebar from '../../components/dashboard/Sidebar';
import { useAuth } from '../../contexts/AuthContext';

interface Agreement {
  id: string;
  tenantName: string;
  propertyName: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'pending';
  rentAmount: number;
  depositAmount: number;
  lastUpdated: string;
  tenantPhone: string;
  tenantEmail: string;
}

export default function LandlordAgreements() {
  const { user } = useAuth();

  const agreements: Agreement[] = [
    {
      id: '1',
      tenantName: 'Rahul Sharma',
      propertyName: 'Kothrud Apartment',
      startDate: '2024-01-01',
      endDate: '2025-01-01',
      status: 'active',
      rentAmount: 22000,
      depositAmount: 66000,
      lastUpdated: '2024-01-01',
      tenantPhone: '+91 98765 43210',
      tenantEmail: 'rahul.sharma@email.com'
    },
    {
      id: '2',
      tenantName: 'Priya Patel',
      propertyName: 'Baner Flat',
      startDate: '2024-02-01',
      endDate: '2025-02-01',
      status: 'active',
      rentAmount: 25000,
      depositAmount: 75000,
      lastUpdated: '2024-02-01',
      tenantPhone: '+91 98765 43211',
      tenantEmail: 'priya.patel@email.com'
    },
    {
      id: '3',
      tenantName: 'Amit Kumar',
      propertyName: 'Wakad Property',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      status: 'expired',
      rentAmount: 20000,
      depositAmount: 60000,
      lastUpdated: '2023-12-31',
      tenantPhone: '+91 98765 43212',
      tenantEmail: 'amit.kumar@email.com'
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
      <div className={`lg:ml-20 min-h-screen transition-all duration-300 ${user?.role === 'landlord' ? 'lg:mr-4' : ''}`}>
        <div className="p-8">
          <TopBar />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Rental Agreements</h1>
              <p className="text-gray-400 mt-1">Manage your property agreements and tenants</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create New Agreement
            </motion.button>
          </div>

          <div className="mt-8">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search agreements by tenant name or property..."
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid gap-6">
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
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-semibold text-white">{agreement.propertyName}</h3>
                            <div className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusColor(agreement.status)}`}>
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" />
                                {agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            Last updated {formatDate(agreement.lastUpdated)}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="text-gray-400 mb-1">Tenant Details</div>
                          <div className="text-white">{agreement.tenantName}</div>
                          <div className="text-sm text-gray-500 mt-1">{agreement.tenantEmail}</div>
                          <div className="text-sm text-gray-500">{agreement.tenantPhone}</div>
                        </div>

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
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
