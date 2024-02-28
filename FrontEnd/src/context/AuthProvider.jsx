import { useContext, createContext, useState , useEffect } from 'react'
import app from '../firebase/firebase.config'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup, onAuthStateChanged,signOut , updateProfile  } from "firebase/auth";

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
  const logout = () => {
    return signOut(auth)
  }

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth , provider)
  }
  const updateUserProfile = ({name , photoURL} ) => {
    return updateProfile(auth.currentUser, {
      displayName: name , photoURL: photoURL
    })
  }
 
  const [user, setUser] = useState(null)
  const authInfo = {
    user,
    setUser,
    createUser,
    login,
    logout,
    signUpWithGoogle,
    updateUserProfile,
  

  }
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
    if (currentUser) {
      setUser(currentUser)
    } return () => {
        return unsubscribe();

    }
  })
}, [auth])



  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>

  )
}

export default AuthProvider