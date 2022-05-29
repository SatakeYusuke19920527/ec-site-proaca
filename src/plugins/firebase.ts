import { getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// 初期化
const apps = getApps
if (!apps.length) {
  initializeApp(firebaseConfig)
}
export const auth = getAuth();
export const db = getFirestore();
export const provider = new GoogleAuthProvider();


/**
 * ログアウト
 */
export const logoutUser = async () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("user sign-out")
  }).catch((error) => {
    // An error happened.
    console.log("user sign-out error ", error.message)
  });
};

/**
 * Google ログイン
 */
export const googleLogin = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log("🚀 ~ file: firebase.ts ~ line 88 ~ .then ~ credential", credential)
      // The signed-in user info.
      const user = result.user;
      console.log("🚀 ~ file: firebase.ts ~ line 91 ~ .then ~ user", user)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log("🚀 ~ file: firebase.ts ~ line 96 ~ .then ~ errorCode", errorCode)
      const errorMessage = error.message;
      console.log("🚀 ~ file: firebase.ts ~ line 98 ~ .then ~ errorMessage", errorMessage)
    });
}

/**
 * chatメッセージ送信
 * @param name 
 * @param message 
 */
export const createDataInFirebase = async (name: string, message: string, photoUrl: string) => {
  console.log('firebase start', name, message)
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      name,
      message,
      photoUrl,
      time: serverTimestamp()
    });
    console.log("Document written with ID:", docRef.id);
  } catch (e) {
    console.log('firebase start2')
    console.error("Error adding document: ", e);
  }
}