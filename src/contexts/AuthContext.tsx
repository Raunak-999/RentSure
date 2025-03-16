import { createContext, useContext, useState, useEffect } from 'react';
import { 
  getAuth, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBHCaGALfCJS99OdwvmS7JOHTrNivWi23s",
  authDomain: "restsure-792d7.firebaseapp.com",
  projectId: "restsure-792d7",
  storageBucket: "restsure-792d7.firebasestorage.app",
  messagingSenderId: "599106451541",
  appId: "1:599106451541:web:024a73fb8d18b30aeafcdc",
  measurementId: "G-0VDRG5MND4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

interface User {
  email: string;
  role: 'tenant' | 'landlord';
  uid: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string, role: 'tenant' | 'landlord') => Promise<void>;
  loginWithGoogle: (role: 'tenant' | 'landlord') => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Get role from localStorage
        const savedRole = localStorage.getItem('userRole') as 'tenant' | 'landlord';
        
        setUser({
          email: firebaseUser.email || '',
          role: savedRole || 'tenant', // Default to tenant if no role found
          uid: firebaseUser.uid
        });
      } else {
        setUser(null);
        localStorage.removeItem('userRole');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, password: string, role: 'tenant' | 'landlord') => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('userRole', role);
      setUser({
        email: result.user.email || '',
        role,
        uid: result.user.uid
      });
    } catch (error) {
      console.error('Email login error:', error);
      throw error;
    }
  };

  const loginWithGoogle = async (role: 'tenant' | 'landlord') => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.setItem('userRole', role);
      setUser({
        email: result.user.email || '',
        role,
        uid: result.user.uid
      });
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('userRole');
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithEmail, loginWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}