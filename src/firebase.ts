import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHCaGALfCJS99OdwvmS7JOHTrNivWi23s",
  authDomain: "restsure-792d7.firebaseapp.com",
  projectId: "restsure-792d7",
  storageBucket: "restsure-792d7.firebasestorage.app",
  messagingSenderId: "599106451541",
  appId: "1:599106451541:web:024a73fb8d18b30aeafcdc",
  measurementId: "G-0VDRG5MND4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;