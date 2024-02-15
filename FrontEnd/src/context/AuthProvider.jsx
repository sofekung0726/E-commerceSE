import { useContext, createContext, useState } from 'react'
import app from '../firebase/firebase.config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup  } from "firebase/auth";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);


  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth , provider)
  }

  const [user, setUser] = useState(null)
  const authInfo = {
    user,
    setUser,
    createUser,
    login,
    signUpWithGoogle

  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>

  )
}

export default AuthProvider