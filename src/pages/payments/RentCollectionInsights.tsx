import { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, Clock, ShieldCheck, AlertTriangle } from 'lucide-react';
import TopBar from '../../components/dashboard/TopBar';
import Sidebar from '../../components/dashboard/Sidebar';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface PendingPayment {
  tenantName: string;
  propertyName: string;
  amount: number;
  dueDate: string;
}

export default function RentCollectionInsights() {
  const [monthlyCollection] = useState({
    total: 83000,
    pending: 45000,
    escrow: 152000,
    upcomingDues: 126000
  });

  const [pendingPayments] = useState<PendingPayment[]>([
    {
      tenantName: 'Rahul Sharma',
      propertyName: '3BHK Luxury Flat',
      amount: 45000,
      dueDate: '2025-03-05'
    }
  ]);

  const collectionData = [
    { month: 'Jan', amount: 80000 },
    { month: 'Feb', amount: 85000 },
    { month: 'Mar', amount: 83000 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Sidebar />
      <div className="ml-64 p-8">
        <TopBar />
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-white mb-8">Rent Collection Insights</h1>

          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <IndianRupee size={24} className="text-green-500" />
                </div>
                <h3 className="text-lg font-medium text-white">Total Collected</h3>
              </div>
              <p className="text-2xl font-bold text-white">₹{monthlyCollection.total.toLocaleString()}</p>
              <p className="text-sm text-gray-400 mt-1">This month</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <AlertTriangle size={24} className="text-yellow-500" />
                </div>
                <h3 className="text-lg font-medium text-white">Pending Payments</h3>
              </div>
              <p className="text-2xl font-bold text-white">₹{monthlyCollection.pending.toLocaleString()}</p>
              <p className="text-sm text-gray-400 mt-1">To be collected</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <ShieldCheck size={24} className="text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-white">Escrow Deposits</h3>
              </div>
              <p className="text-2xl font-bold text-white">₹{monthlyCollection.escrow.toLocaleString()}</p>
              <p className="text-sm text-gray-400 mt-1">Total held</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Clock size={24} className="text-purple-500" />
                </div>
                <h3 className="text-lg font-medium text-white">Upcoming Dues</h3>
              </div>
              <p className="text-2xl font-bold text-white">₹{monthlyCollection.upcomingDues.toLocaleString()}</p>
              <p className="text-sm text-gray-400 mt-1">Next 30 days</p>
            </motion.div>
          </div>

          {/* Collection Trend */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Collection Trend</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={collectionData}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₹${value/1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#9CA3AF' }}
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#22C55E"
                    fillOpacity={1}
                    fill="url(#colorAmount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pending Payments */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Pending Payments</h2>
            <div className="grid gap-4">
              {pendingPayments.map((payment, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-white font-medium">{payment.tenantName}</h3>
                    <p className="text-gray-400 text-sm">{payment.propertyName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">₹{payment.amount.toLocaleString()}</p>
                    <p className="text-gray-400 text-sm">
                      Due: {new Date(payment.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
