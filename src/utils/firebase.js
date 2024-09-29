import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Initialize Firebase
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
