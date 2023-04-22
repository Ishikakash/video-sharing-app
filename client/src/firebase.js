
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbiV9WngwbvBOtp-IPvbTdXPJmfGhSfiA",
  authDomain: "video-21eee.firebaseapp.com",
  projectId: "video-21eee",
  storageBucket: "video-21eee.appspot.com",
  messagingSenderId: "216373720469",
  appId: "1:216373720469:web:95ef6fb59e0a8fc49d729c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// creating authentication
export const auth = getAuth();
export const provider = new GoogleAuthProvider(); // this is the provide that allow us to login using google button
// we can use them in the signin page

export default app;
// we gonna use it when we upload any image or video