import React, { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@fire";
import { checkUser, getData, insertOne } from "@utils/dbUtils";
import { COLLECTION_NAME } from "@utils/constants";
import { formatUserDataToObject } from "@utils";
import { doc, onSnapshot } from "@firebase/firestore";
import { db } from "@fire";
import { Skeleton } from "antd";
import LoaderOverlay from "@components/custom/LoaderOverlay";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();


const provider = new GoogleAuthProvider();

export default function AuthStore({ children }) {
  const [user, loading, error] = useAuthState(auth);
  const [drawer, setDrawer] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [categories,setCatogries]=useState([]);
  useEffect(() => {
    let unsub;
    if (user) {
      unsub = onSnapshot(doc(db, COLLECTION_NAME.USERS, user.uid), (doc) => {
        setCurrentUser({ ...doc.data(), id: doc.id });
      });
    }
    return () => unsub && unsub();
  }, [user]);
useEffect(()=>{
  async function getCategories(){
    const res=await getData(COLLECTION_NAME.CATEGORIES);
    setCatogries(res)
  }
  getCategories();
},[])
  const signIn = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      // check if user entry is already present in firebase
      const result = await checkUser(COLLECTION_NAME.USERS, response.user.uid);

      // if not make an entry in firestore.
      if (result) {
        const formattedUser = formatUserDataToObject(response.user);
        await insertOne(COLLECTION_NAME.USERS, {...formattedUser,isSeller:false});
      }
    } catch (err) {
    }
  };
  const logout = async () => {
    setCurrentUser(null);
    await auth.signOut();
  };

  const handleEmailSignup = async(name,email,password) =>{
    try {
      const result = await createUserWithEmailAndPassword(auth,email,password);
      await insertOne(COLLECTION_NAME.USERS, {displayName:name,email,isSeller:false,uid:result.user.uid});
    } catch(err) {
      throw new Error('Something went wrong. Please try again')
    }
  }

  const handleEmailLogin = async(email,password) => {
    try {
      const result = await signInWithEmailAndPassword(auth,email,password);
    } catch(err) {
      throw new Error('Email or Password is wrong. Try Again')
    }
  }
  const userAttr = { setCurrentUser,currentUser, user,categories, signIn, logout, handleEmailLogin, handleEmailSignup, drawer, setDrawer };
  if (loading) return <LoaderOverlay />;
  if (error) return <div>Error: {error}</div>;
  // authentication methods
  if(user && !currentUser) return <LoaderOverlay />;
  return (
    <AuthContext.Provider value={userAttr}>{children}</AuthContext.Provider>
  );
}
