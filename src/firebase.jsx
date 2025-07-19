import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCR3hy8uJxPuJjg8iUR5Kvz_TZRiCPTHCQ",
  authDomain: "taskly-22aff.firebaseapp.com",
  projectId: "taskly-22aff",
  storageBucket: "taskly-22aff.firebasestorage.app",
  messagingSenderId: "466155352635",
  appId: "1:466155352635:web:187138ca819737b543221e",
  measurementId: "G-KY3Y4H3MJT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;