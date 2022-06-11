// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// official email
const firebaseConfig = {
  apiKey: 'AIzaSyDaKqFLpYA8qhp1u2-pz_neQAv9tIfsR3c',
  authDomain: 'kintabalidog.firebaseapp.com',
  projectId: 'kintabalidog',
  storageBucket: 'kintabalidog.appspot.com',
  messagingSenderId: '845320201949',
  appId: '1:845320201949:web:089ba48fce26ee08311d34',
  measurementId: 'G-ZYEG4CG7RB',
}

// personal email
// const firebaseConfig = {
//   apiKey: 'AIzaSyBKRP66zSThOQz_YF9IAoY1XufNnT-LLRU',
//   authDomain: 'kintabalidog-1e371.firebaseapp.com',
//   projectId: 'kintabalidog-1e371',
//   storageBucket: 'kintabalidog-1e371.appspot.com',
//   messagingSenderId: '668199592868',
//   appId: '1:668199592868:web:7c41638cbe1d035e689731',
//   measurementId: 'G-HR8HYG86TW',
// }

// Initialize Firebase
let app
try {
  app = getApp()
} catch {
  app = initializeApp(firebaseConfig)
}

export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
setPersistence(auth, browserSessionPersistence)
