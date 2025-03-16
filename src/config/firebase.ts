import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

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
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, analytics };
