import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Your Firebase configuration
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
