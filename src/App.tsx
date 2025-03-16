import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import TenantDashboard from './pages/dashboard/TenantDashboard';
import LandlordDashboard from './pages/dashboard/LandlordDashboard';
import TenantAgreements from './pages/agreements/TenantAgreements';
import TenantPayments from './pages/payments/TenantPayments';
import TenantDisputes from './pages/disputes/TenantDisputes';
import LandlordAgreements from './pages/agreements/LandlordAgreements';
import RentCollectionInsights from './pages/payments/RentCollectionInsights';
import DisputeResolution from './pages/disputes/DisputeResolution';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, FileCheck, BanknoteIcon, Brain, Bell, Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'tenant' | 'landlord';
}

function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <>{children}</>;
}

function Header() {
  const navigate = useNavigate();
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-gray-900/50 backdrop-blur-xl border-b border-white/10"
    >
      <nav className="container mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
        >
          RentSure
        </motion.div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
        </div>
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="px-4 py-2 text-white font-medium"
          >
            Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium flex items-center gap-2"
          >
            Sign Up <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>
      </nav>
    </motion.header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-xl border-t border-white/10 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">RentSure</h3>
            <p className="mt-4 text-gray-400">Securing the future of rental agreements with AI-powered solutions.</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">About Us</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Pricing</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">FAQs</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Connect With Us</h4>
            <div className="flex items-center gap-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          {new Date().getFullYear()} RentSure. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-purple-400" />,
      title: 'AI-Powered Verification',
      description: 'Advanced identity verification for both tenants and landlords using cutting-edge AI technology'
    },
    {
      icon: <FileCheck className="w-8 h-8 text-cyan-400" />,
      title: 'Digital Agreements',
      description: 'Secure e-signature enabled rental agreements with automated contract generation'
    },
    {
      icon: <BanknoteIcon className="w-8 h-8 text-green-400" />,
      title: 'Secure Payments',
      description: 'Automated rent collection with escrow protection and instant notifications'
    },
    {
      icon: <Brain className="w-8 h-8 text-pink-400" />,
      title: 'AI Dispute Resolution',
      description: 'Smart conflict resolution system with fraud prevention mechanisms'
    },
    {
      icon: <Bell className="w-8 h-8 text-yellow-400" />,
      title: 'Smart Management',
      description: 'Automated notifications and intelligent lease management system'
    }
  ];

  const pricingPlans = [
    {
      name: 'Basic',
      price: '₹999',
      period: '/month',
      description: 'Perfect for individual landlords',
      features: [
        'Up to 5 properties',
        'Basic tenant verification',
        'Digital agreements',
        'Payment tracking',
        'Email support'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Professional',
      price: '₹2,499',
      period: '/month',
      description: 'Ideal for property managers',
      features: [
        'Up to 20 properties',
        'Advanced AI verification',
        'Priority dispute resolution',
        'Real-time analytics',
        '24/7 phone support'
      ],
      color: 'from-cyan-500 to-blue-500',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large property portfolios',
      features: [
        'Unlimited properties',
        'Custom AI models',
        'Dedicated account manager',
        'API access',
        'SLA guarantees'
      ],
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const howItWorks = [
    {
      step: '1️⃣',
      title: 'Sign Up & Verify',
      description: 'AI checks identity & security',
      color: 'from-purple-500 to-pink-500'
    },
    {
      step: '2️⃣',
      title: 'Create Agreement',
      description: 'Auto-generates a rental contract',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      step: '3️⃣',
      title: 'Secure Payments',
      description: 'AI monitors rent deposits',
      color: 'from-green-500 to-emerald-500'
    },
    {
      step: '4️⃣',
      title: 'Manage & Automate',
      description: 'Get reminders, resolve issues with AI',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div id="home" className="flex flex-col items-center justify-center text-center min-h-screen pt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
          >
            RentSure
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-xl text-gray-300 max-w-2xl"
          >
            The future of rental property management. Secure, efficient, and AI-powered platform for both landlords and tenants.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate('/login')}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium flex items-center gap-2 hover:scale-105 transition-transform"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Features Section */}
        <div id="features" className="py-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Powerful Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-xl border border-white/10 hover:bg-gray-800/70 transition-colors group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 w-fit">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white text-center mb-4"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
          >
            Choose the perfect plan for your rental property management needs
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className={`relative p-6 rounded-2xl bg-gray-800/50 backdrop-blur-xl border border-white/10 ${
                  plan.popular ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-medium text-white">
                    Most Popular
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  <div className="flex items-end justify-center gap-1 mb-6">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 mb-1">{plan.period}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${plan.color}`} />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/login')}
                  className={`mt-8 w-full py-3 rounded-lg bg-gradient-to-r ${plan.color} text-white font-medium`}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="py-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="p-6 rounded-2xl bg-gray-800/50 backdrop-blur-xl border border-white/10"
              >
                <div className={`text-4xl mb-4 bg-gradient-to-r ${step.color} text-transparent bg-clip-text`}>
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="py-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white mb-6"
          >
            Ready to Transform Your Rental Experience?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Join thousands of satisfied users who have already modernized their rental management process.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium flex items-center gap-2 mx-auto hover:scale-105 transition-transform"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          
          {/* Tenant Routes */}
          <Route path="/tenant" element={
            <ProtectedRoute requiredRole="tenant">
              <TenantDashboard />
            </ProtectedRoute>
          } />
          <Route path="/tenant/agreements" element={
            <ProtectedRoute requiredRole="tenant">
              <TenantAgreements />
            </ProtectedRoute>
          } />
          <Route path="/tenant/payments" element={
            <ProtectedRoute requiredRole="tenant">
              <TenantPayments />
            </ProtectedRoute>
          } />
          <Route path="/tenant/disputes" element={
            <ProtectedRoute requiredRole="tenant">
              <TenantDisputes />
            </ProtectedRoute>
          } />

          {/* Landlord Routes */}
          <Route path="/landlord" element={
            <ProtectedRoute requiredRole="landlord">
              <LandlordDashboard />
            </ProtectedRoute>
          } />
          <Route path="/landlord/agreements" element={
            <ProtectedRoute requiredRole="landlord">
              <LandlordAgreements />
            </ProtectedRoute>
          } />
          <Route path="/landlord/insights" element={
            <ProtectedRoute requiredRole="landlord">
              <RentCollectionInsights />
            </ProtectedRoute>
          } />
          <Route path="/landlord/disputes" element={
            <ProtectedRoute requiredRole="landlord">
              <DisputeResolution />
            </ProtectedRoute>
          } />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;