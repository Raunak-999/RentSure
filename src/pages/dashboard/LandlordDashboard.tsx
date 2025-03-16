import { Building, Users, TrendingUp, Plus } from 'lucide-react';
import TopBar from '../../components/dashboard/TopBar';
import Sidebar from '../../components/dashboard/Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import AddPropertyForm from '../../components/forms/AddPropertyForm';

interface Property {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  propertyType: string;
  address: string;
  city: string;
  state: string;
  monthlyRent: string;
  status: string;
  createdAt: string;
  tenantName?: string;
  tenantEmail?: string;
  tenantPhone?: string;
}

export default function LandlordDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Subscribe to properties collection
    const unsubscribe = onSnapshot(
      query(collection(db, 'properties'), where('landlordId', '==', user.uid)),
      (snapshot) => {
        const propertiesData = snapshot.docs.map((doc, index) => {
          const data = doc.data();
          // Add tenant details to first and third properties
          if (index === 0) {
            return {
              id: doc.id,
              ...data,
              monthlyRent: "24000",
              tenantName: "Rahul Kumar",
              tenantEmail: "rahul.k@gmail.com",
              tenantPhone: "+91 9876543210",
              status: "Occupied"
            };
          } else if (index === 2) {
            return {
              id: doc.id,
              ...data,
              monthlyRent: "35000",
              tenantName: "Priya Singh",
              tenantEmail: "priya.singh@gmail.com",
              tenantPhone: "+91 9876543211",
              status: "Occupied"
            };
          }
          return {
            id: doc.id,
            ...data,
            monthlyRent: data.monthlyRent || "15000" // Default rent for available properties
          };
        }) as Property[];
        setProperties(propertiesData);
      }
    );

    return () => unsubscribe();
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <TopBar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64 min-h-screen">
          <div className="p-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                  <p className="text-gray-400 mt-1">Manage your properties and tenants</p>
                </div>
                <button
                  onClick={() => setShowAddProperty(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors"
                >
                  <Plus size={20} />
                  Add Property
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Properties */}
                <div className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-xl border border-white/10 transition-transform hover:scale-[1.02]">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10">
                      <Building className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Total Properties</p>
                      <p className="text-2xl font-semibold text-white">{properties.length}</p>
                    </div>
                  </div>
                </div>

                {/* Total Tenants */}
                <div className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-xl border border-white/10 transition-transform hover:scale-[1.02]">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-green-500/10">
                      <Users className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Total Tenants</p>
                      <p className="text-2xl font-semibold text-white">{properties.length}</p>
                    </div>
                  </div>
                </div>

                {/* Monthly Income */}
                <div className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-xl border border-white/10 transition-transform hover:scale-[1.02]">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-yellow-500/10">
                      <TrendingUp className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Total Monthly Income</p>
                      <p className="text-2xl font-semibold text-white">
                        ₹{properties.reduce((sum, property) => {
                          const rent = parseInt(property.monthlyRent || '0');
                          return property.status === 'Occupied' ? sum + rent : sum;
                        }, 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Properties List */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-white">Properties</h2>
                  <p className="text-gray-400">{properties.length} total</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map((property) => (
                    <div
                      key={property.id}
                      className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-xl border border-white/10 transition-transform hover:scale-[1.02]"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-white">{property.propertyType || 'N/A'}</h3>
                          <p className="text-sm text-gray-400 mt-1">{property.address || 'N/A'}</p>
                          <p className="text-sm text-gray-400">{property.city || 'N/A'}, {property.state || 'N/A'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-medium text-white">₹{parseInt(property.monthlyRent || '0').toLocaleString()}</p>
                          <p className="text-sm text-gray-400">per month</p>
                        </div>
                      </div>
                      <div className="border-t border-white/10 my-4 pt-4">
                        <p className="text-sm font-medium text-gray-400 mb-2">Tenant Details</p>
                        {property.tenantName ? (
                          <>
                            <p className="text-sm text-white">{property.tenantName}</p>
                            <p className="text-sm text-gray-400">{property.tenantEmail}</p>
                            <p className="text-sm text-gray-400">{property.tenantPhone}</p>
                          </>
                        ) : (
                          <p className="text-sm text-gray-400">No tenant assigned</p>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${property.status === 'Occupied' ? 'bg-red-500' : 'bg-green-500'}`} />
                          <span className="text-sm text-gray-400">{property.status || 'Available'}</span>
                        </div>
                        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {showAddProperty && (
                <AddPropertyForm
                  onClose={() => setShowAddProperty(false)}
                  onSuccess={() => {
                    setShowAddProperty(false);
                  }}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
