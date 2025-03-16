import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, AlertCircle, FileText, Send } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import TopBar from '../../components/dashboard/TopBar';
import Sidebar from '../../components/dashboard/Sidebar';

interface Message {
  id: string;
  sender: 'user' | 'ai' | 'system';
  content: string;
  timestamp: string;
}

interface DisputeRequest {
  id: string;
  type: 'maintenance' | 'deposit' | 'billing';
  status: 'pending' | 'in_progress' | 'resolved';
  description: string;
  amount?: number;
  createdAt: string;
  response?: string;
}

export default function TenantDisputes() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'system',
      content: 'Welcome! I can help you with maintenance requests, deposit-related queries, or billing disputes. What would you like assistance with?',
      timestamp: new Date().toISOString()
    }
  ]);

  const [disputes] = useState<DisputeRequest[]>([
    {
      id: '1',
      type: 'maintenance',
      status: 'in_progress',
      description: 'Water heater not working properly in master bathroom',
      createdAt: '2025-03-15T10:30:00Z',
      response: 'Maintenance team scheduled for inspection tomorrow between 10 AM - 12 PM'
    },
    {
      id: '2',
      type: 'deposit',
      status: 'pending',
      description: 'Request for security deposit return due to relocation',
      amount: 44000,
      createdAt: '2025-03-16T09:00:00Z'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    // Simulate AI response
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      content: 'I understand you\'re having an issue. To better assist you, could you please provide more details about the problem? For maintenance issues, include the specific location and when you first noticed it. For deposit or billing queries, please mention the relevant amounts and dates.',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setNewMessage('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'text-green-500 bg-green-500/20';
      case 'in_progress':
        return 'text-blue-500 bg-blue-500/20';
      default:
        return 'text-yellow-500 bg-yellow-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'maintenance':
        return '🔧';
      case 'deposit':
        return '💰';
      case 'billing':
        return '📄';
      default:
        return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Sidebar />
      <div className="ml-64 p-8">
        <TopBar />
        <div className="mt-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Support & Disputes</h1>
            <Button variant="primary" className="flex items-center gap-2">
              <FileText size={20} />
              New Request
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* AI Chat Interface */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <MessageSquare size={24} className="text-blue-500" />
                </div>
                <h2 className="text-xl font-semibold text-white">AI Assistant</h2>
              </div>

              <div className="h-[400px] overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : message.sender === 'ai'
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Describe your issue..."
                  className="flex-1 bg-gray-800 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  variant="primary"
                  onClick={handleSendMessage}
                  className="flex items-center gap-2"
                >
                  <Send size={16} />
                  Send
                </Button>
              </div>
            </div>

            {/* Active Requests */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <AlertCircle size={24} className="text-purple-500" />
                </div>
                <h2 className="text-xl font-semibold text-white">Active Requests</h2>
              </div>

              <div className="space-y-4">
                {disputes.map((dispute) => (
                  <motion.div
                    key={dispute.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800/50 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getTypeIcon(dispute.type)}</span>
                        <h3 className="text-white font-medium capitalize">
                          {dispute.type} Request
                        </h3>
                      </div>
                      <div className={`px-3 py-1 rounded-full ${getStatusColor(dispute.status)}`}>
                        {dispute.status.replace('_', ' ').charAt(0).toUpperCase() + 
                         dispute.status.slice(1).replace('_', ' ')}
                      </div>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-300">{dispute.description}</p>
                      {dispute.response && (
                        <div className="mt-2 pt-2 border-t border-gray-700">
                          <p className="text-sm text-blue-400">Response:</p>
                          <p className="text-sm text-gray-300 mt-1">{dispute.response}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <p className="text-gray-400">
                        Created: {new Date(dispute.createdAt).toLocaleDateString()}
                      </p>
                      {dispute.amount && (
                        <p className="text-white font-medium">
                          Amount: ₹{dispute.amount.toLocaleString()}
                        </p>
                      )}
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
