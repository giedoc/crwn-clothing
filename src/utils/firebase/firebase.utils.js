import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
 } from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    Firestore,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDQw6Zi6ovSUyveszlI3fxei_mh6_kZA7M",
    authDomain: "crwn-clothing-db-b0a79.firebaseapp.com",
    projectId: "crwn-clothing-db-b0a79",
    storageBucket: "crwn-clothing-db-b0a79.appspot.com",
    messagingSenderId: "971495759621",
    appId: "1:971495759621:web:8fdf1700309060053b216c"
  };
  
  // Initialize Firebase
  const firebaappseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  
  provider.setCustomParameters({
      prompt: "select_account"
  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db,'users', userAuth.uid)
  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot)
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{

      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });

    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef;
}