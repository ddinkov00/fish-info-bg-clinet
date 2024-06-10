import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { envConfig } from './environment.config';

const firebaseConfig = {
  apiKey: envConfig.firebaseApiKey,
  authDomain: 'fish-info-bg.firebaseapp.com',
  projectId: 'fish-info-bg',
  storageBucket: 'fish-info-bg.appspot.com',
  messagingSenderId: '422292985667',
  appId: '1:422292985667:web:4d4e1b6609d9e095b901f6',
  measurementId: 'G-2CNVREP1BR',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
