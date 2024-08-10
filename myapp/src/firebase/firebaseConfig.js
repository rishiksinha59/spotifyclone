import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
apiKey: "AIzaSyAq3JZWgkncuqWq_WOaYlOMZNcpdRF20VY",
  authDomain: "authentication-9a971.firebaseapp.com",
  projectId: "authentication-9a971",
  storageBucket: "authentication-9a971.appspot.com",
  messagingSenderId: "833673968152",
  appId: "1:833673968152:web:0ddf64dd07ea3af45c216d"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export default app