import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Check, X, AlertCircle, Shield } from 'lucide-react';
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
  tenantName: string;
  propertyName: string;
  amount: number;
  type: 'deposit' | 'maintenance' | 'other';
  status: 'pending' | 'approved' | 'rejected';
  description: string;
}

export default function DisputeResolution() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'system',
      content: 'Welcome to AI-assisted dispute resolution. How can I help you today?',
      timestamp: new Date().toISOString()
    }
  ]);

  const [disputes] = useState<DisputeRequest[]>([
    {
      id: '1',
      tenantName: 'Rahul Sharma',
      propertyName: '3BHK Luxury Flat',
      amount: 45000,
      type: 'deposit',
      status: 'pending',
      description: 'Requesting deposit refund due to early termination of lease.'
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
      content: 'Based on the lease terms and deposit policy, I recommend approving a partial refund of ₹30,000, considering the early termination clause and property condition assessment.',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Sidebar />
      <div className="ml-64 p-8">
        <TopBar />
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-white mb-8">Dispute Resolution</h1>

          <div className="grid grid-cols-2 gap-8">
            {/* AI Chat Interface */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <MessageSquare size={24} className="text-blue-500" />
                </div>
                <h2 className="text-xl font-semibold text-white">AI Assistant</h2>
              </div>

              <div className="h-[400px] overflow-y-auto mb-4 space-y-4">
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
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  variant="primary"
                  onClick={handleSendMessage}
                  className="flex items-center gap-2"
                >
                  Send
                </Button>
              </div>
            </div>

            {/* Deposit Requests */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Shield size={24} className="text-purple-500" />
                </div>
                <h2 className="text-xl font-semibold text-white">Deposit Requests</h2>
              </div>

              <div className="space-y-4">
                {disputes.map((dispute) => (
                  <motion.div
                    key={dispute.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800/50 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-white font-medium">{dispute.tenantName}</h3>
                        <p className="text-gray-400 text-sm">{dispute.propertyName}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="success"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <Check size={16} />
                          Accept
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          <X size={16} />
                          Reject
                        </Button>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-300">{dispute.description}</p>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <AlertCircle size={16} className="text-yellow-500" />
                        <span className="text-yellow-500">Pending Review</span>
                      </div>
                      <p className="text-white font-medium">
                        Amount: ₹{dispute.amount.toLocaleString()}
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
