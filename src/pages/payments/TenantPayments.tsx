import { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Calendar, Clock, CreditCard, FileText, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import TopBar from '../../components/dashboard/TopBar';
import Sidebar from '../../components/dashboard/Sidebar';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface PaymentHistory {
  month: string;
  amount: number;
  status: 'paid' | 'pending' | 'late';
  date: string;
}

export default function TenantPayments() {
  const [currentRent] = useState({
    amount: 22000,
    dueDate: '2025-04-05',
    status: 'pending',
    property: '2BHK Premium Apartment',
    landlord: 'Priya Iyer'
  });

  const [paymentHistory] = useState<PaymentHistory[]>([
    { month: 'Jan', amount: 22000, status: 'paid', date: '2025-01-03' },
    { month: 'Feb', amount: 22000, status: 'paid', date: '2025-02-04' },
    { month: 'Mar', amount: 22000, status: 'paid', date: '2025-03-05' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'late':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Sidebar />
      <div className="ml-64 p-8">
        <TopBar />
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-white mb-8">Rent Payments</h1>

          {/* Current Rent Card */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Current Rent Due</h2>
                <p className="text-gray-400">{currentRent.property}</p>
              </div>
              <Button variant="primary" className="flex items-center gap-2">
                <CreditCard size={20} />
                Pay Now
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-6 mt-6">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <IndianRupee size={16} className="text-gray-400" />
                  <p className="text-gray-400 text-sm">Amount</p>
                </div>
                <p className="text-white font-medium">₹{currentRent.amount.toLocaleString()}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-gray-400" />
                  <p className="text-gray-400 text-sm">Due Date</p>
                </div>
                <p className="text-white font-medium">
                  {new Date(currentRent.dueDate).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-gray-400" />
                  <p className="text-gray-400 text-sm">Days Left</p>
                </div>
                <p className="text-white font-medium">
                  {Math.ceil((new Date(currentRent.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={16} className="text-gray-400" />
                  <p className="text-gray-400 text-sm">Status</p>
                </div>
                <p className={`font-medium ${getStatusColor(currentRent.status)}`}>
                  {currentRent.status.charAt(0).toUpperCase() + currentRent.status.slice(1)}
                </p>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Payment History</h2>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={paymentHistory}>
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

            <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Recent Transactions</h2>
              <div className="space-y-4">
                {paymentHistory.map((payment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        payment.status === 'paid' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                      }`}>
                        {payment.status === 'paid' ? (
                          <CreditCard size={20} className="text-green-500" />
                        ) : (
                          <AlertCircle size={20} className="text-yellow-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          Rent for {payment.month}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Paid on {new Date(payment.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">
                        ₹{payment.amount.toLocaleString()}
                      </p>
                      <p className={`text-sm ${getStatusColor(payment.status)}`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
