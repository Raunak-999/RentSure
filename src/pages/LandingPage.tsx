import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, FileCheck, Wallet, Brain, ChevronLeft, ChevronRight,
  Mail, MapPin, Phone as PhoneIcon
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const features = [
  {
    icon: Shield,
    title: 'AI-Powered Verification',
    description: 'Advanced tenant & landlord verification using AI technology.'
  },
  {
    icon: FileCheck,
    title: 'Digital Agreements',
    description: 'E-signatures and automated contract generation.'
  },
  {
    icon: Wallet,
    title: 'Smart Payments',
    description: 'Automated rent collection and secure escrow services.'
  },
  {
    icon: Brain,
    title: 'AI Dispute Resolution',
    description: 'Smart conflict resolution powered by AI.'
  }
];

const statistics = [
  { value: '98%', label: 'User Satisfaction' },
  { value: '24/7', label: 'AI Support' },
  { value: '50K+', label: 'Active Users' },
  { value: '₹100M+', label: 'Rent Processed' }
];

const testimonials = [
  {
    name: 'Amit Patel',
    role: 'Property Owner',
    image: 'https://i.pravatar.cc/150?img=11',
    quote: 'RentSure has revolutionized how I manage my rental properties. The AI insights are incredibly valuable.'
  },
  {
    name: 'Priya Sharma',
    role: 'Tenant',
    image: 'https://i.pravatar.cc/150?img=12',
    quote: 'The automated payments and digital agreements make renting so much easier. Highly recommended!'
  },
  {
    name: 'Raj Kumar',
    role: 'Real Estate Agent',
    image: 'https://i.pravatar.cc/150?img=13',
    quote: 'As an agent, RentSure helps me close deals faster with its instant agreement generation.'
  }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isNavSolid, setIsNavSolid] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Handle scroll for navbar transparency
  const handleScroll = () => {
    setIsNavSolid(window.scrollY > 50);
  };

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505]">
      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
          isNavSolid ? 'bg-black/80 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.h1
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400/90 to-blue-500/90 text-transparent bg-clip-text"
          >
            RentSure
          </motion.h1>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors duration-300">Home</a>
            <a href="#features" className="text-gray-500 hover:text-gray-300 transition-colors duration-300">Features</a>
            <a href="#pricing" className="text-gray-500 hover:text-gray-300 transition-colors duration-300">Pricing</a>
            <a href="#contact" className="text-gray-500 hover:text-gray-300 transition-colors duration-300">Contact</a>
          </div>
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/login')}
            className="px-6 py-2 rounded-xl bg-white/5 text-gray-300 backdrop-blur-lg hover:bg-white/8 transition-all duration-300"
          >
            Sign In
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0 bg-grid-pattern opacity-30"
          style={{ y, opacity }}
        />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5" />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-[180px] opacity-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* 3D Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-white/10"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10"
            animate={{
              y: [0, 20, 0],
              rotate: [0, -15, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400/90 to-blue-500/90 text-transparent bg-clip-text"
          >
            Revolutionizing Rental Agreements with AI & Automation
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            <span className="typing-effect">Instant agreements. AI-driven security. No disputes.</span>
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/login')}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500/60 to-blue-500/60 text-white font-semibold hover:from-cyan-500/80 hover:to-blue-500/80 transition-all duration-300"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-xl bg-white/5 text-gray-300 font-semibold hover:bg-white/8 transition-all duration-300 backdrop-blur-xl"
            >
              Sign in with Google
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-20 px-4 relative overflow-hidden bg-black/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3, transition: { duration: 0.3 } }}
              className="text-center transition-all duration-300"
            >
              <motion.h3
                className="text-5xl font-bold bg-gradient-to-r from-cyan-400/90 to-blue-500/90 text-transparent bg-clip-text mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {stat.value}
              </motion.h3>
              <p className="text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 px-4 relative overflow-hidden bg-black/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400/90 to-blue-500/90 text-transparent bg-clip-text"
          >
            Why Choose RentSure?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="p-6 rounded-2xl glass hover:bg-white/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 flex items-center justify-center mb-4 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-cyan-400/80" />
                </div>
                <h3 className="text-xl font-semibold text-gray-200 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 px-4 relative overflow-hidden bg-black/40">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400/90 to-purple-500/90 text-transparent bg-clip-text"
          >
            What Our Users Say
          </motion.h2>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6">
                  <img 
                    src={testimonials[testimonialIndex].image} 
                    alt={testimonials[testimonialIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xl text-gray-400 mb-6 italic">
                  "{testimonials[testimonialIndex].quote}"
                </p>
                <h3 className="text-gray-200 font-semibold">
                  {testimonials[testimonialIndex].name}
                </h3>
                <p className="text-gray-500">
                  {testimonials[testimonialIndex].role}
                </p>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact" className="py-20 px-4 relative overflow-hidden bg-black/30">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400/90 to-blue-500/90 text-transparent bg-clip-text"
          >
            Get in Touch
          </motion.h2>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/5 text-gray-200 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/5 text-gray-200 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/5 text-gray-200 focus:outline-none focus:border-cyan-500/50 transition-colors h-32 resize-none"
                  placeholder="Your message"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500/60 to-blue-500/60 text-white font-semibold hover:from-cyan-500/80 hover:to-blue-500/80 transition-all duration-300"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/5 bg-black/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400/90 to-blue-500/90 text-transparent bg-clip-text mb-4">
              RentSure
            </h3>
            <p className="text-gray-500">
              Revolutionizing rental agreements with AI and automation.
            </p>
          </div>
          <div>
            <h4 className="text-gray-200 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Home</a></li>
              <li><a href="#features" className="text-gray-500 hover:text-gray-300 transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-gray-500 hover:text-gray-300 transition-colors">Pricing</a></li>
              <li><a href="#contact" className="text-gray-500 hover:text-gray-300 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-200 font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-200 font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-500">
                <Mail className="w-4 h-4" />
                contact@rentsure.com
              </li>
              <li className="flex items-center gap-2 text-gray-500">
                <PhoneIcon className="w-4 h-4" />
                +91 123-456-7890
              </li>
              <li className="flex items-center gap-2 text-gray-500">
                <MapPin className="w-4 h-4" />
                Bangalore, India
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-gray-600">
          <p> 2025 RentSure. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
