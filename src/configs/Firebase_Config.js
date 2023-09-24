import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import environment from "../environments/environment.staging";

// Initialize Firebase
const app = initializeApp(environment.firebase_config);
export const auth = getAuth(app);
export default app;