import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

interface AddPropertyFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  // Personal Details
  fullName: string;
  email: string;
  phoneNumber: string;
  governmentId: string;
  idType: 'aadhaar' | 'pan' | 'passport';
  
  // Property Details
  propertyType: 'apartment' | 'house' | 'villa' | 'pg';
  address: string;
  city: string;
  state: string;
  pinCode: string;
  bedrooms: string;
  bathrooms: string;
  furnishing: 'fully' | 'semi' | 'unfurnished';
  amenities: string[];
  monthlyRent: string;
  
  // Rent Details
  securityDeposit: string;
  maintenanceCharges: string;
  minLeaseDuration: string;
  availabilityDate: string;
}

export default function AddPropertyForm({ onClose, onSuccess }: AddPropertyFormProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    governmentId: '',
    idType: 'aadhaar',
    propertyType: 'apartment',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    bedrooms: '',
    bathrooms: '',
    furnishing: 'unfurnished',
    amenities: [],
    monthlyRent: '',
    securityDeposit: '',
    maintenanceCharges: '',
    minLeaseDuration: '',
    availabilityDate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'properties'), {
        ...formData,
        landlordId: user?.uid,
        status: 'Available',
        createdAt: new Date().toISOString()
      });
      onSuccess();
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 rounded-2xl p-8 w-full max-w-2xl mx-4 relative border border-white/10"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Add New Property</h2>
        
        {/* Steps Indicator */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  s === step ? 'bg-blue-500 text-white' : 
                  s < step ? 'bg-green-500 text-white' : 
                  'bg-gray-700 text-gray-400'
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div className={`w-16 h-0.5 ${s < step ? 'bg-green-500' : 'bg-gray-700'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Personal Details */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Government ID Type</label>
              <select
                name="idType"
                value={formData.idType}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              >
                <option value="aadhaar">Aadhaar</option>
                <option value="pan">PAN</option>
                <option value="passport">Passport</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Government ID</label>
              <input
                type="text"
                name="governmentId"
                value={formData.governmentId}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Enter your ID number"
              />
            </div>
          </div>
        )}

        {/* Step 2: Property Details */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Property Type</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="pg">PG</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Enter property address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  placeholder="Enter state"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  placeholder="Number of bedrooms"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                  placeholder="Number of bathrooms"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Monthly Rent (₹)</label>
              <input
                type="number"
                name="monthlyRent"
                value={formData.monthlyRent}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Enter monthly rent"
              />
            </div>
          </div>
        )}

        {/* Step 3: Rent Details */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Security Deposit (₹)</label>
              <input
                type="number"
                name="securityDeposit"
                value={formData.securityDeposit}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Enter security deposit amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Maintenance Charges (₹)</label>
              <input
                type="number"
                name="maintenanceCharges"
                value={formData.maintenanceCharges}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Enter maintenance charges"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Minimum Lease Duration (months)</label>
              <input
                type="number"
                name="minLeaseDuration"
                value={formData.minLeaseDuration}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                placeholder="Enter minimum lease duration"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Availability Date</label>
              <input
                type="date"
                name="availabilityDate"
                value={formData.availabilityDate}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              Previous
            </button>
          )}
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 ml-auto"
            >
              Submit
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
