import { db, auth } from './firebase.init'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import {
  query,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
  collection,
  where,
} from 'firebase/firestore'
import { timeStampToDateString } from '../helper/dateHelper'

const puppiesCollectionRef = collection(db, 'puppies')
const usersCollectionRef = collection(db, 'users')
const bookedCollectionRef = collection(db, 'booked')
const pricingCollectionRef = collection(db, 'pricing')

export const signUpInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  try {
    // Sign Up With Google comes first in Firebase Auth, then to Firebase Store in Data Capture
    // PopUp sign in first
    const result = await signInWithPopup(auth, provider)
    console.log(result)
    // Return email, uid, and token to be consumed by Redux
    let { creationTime, lastSignInTime } = result.user.metadata
    return {
      email: result.user.email,
      uid: result.user.uid,
      token: result.user.stsTokenManager.accessToken,
      imgUrl: result.user.photoURL,
      creationTime,
      lastSignInTime,
    }
  } catch (err) {
    console.log(err)
    return { error: err.message }
  }
}

export const setGoogleDataToFirestore = async (regInput, userInput) => {
  const { email: emailUserInput, password, ...userInputRest } = userInput
  const { uid, imgUrl, email, token, creationTime, lastSignInTime } = regInput
  try {
    const googleDataToFirestore = {
      isAdmin: false,
      createdAt: new Date(creationTime),
      lastLoginAt: new Date(lastSignInTime),
      imgUrl,
      uid,
      email,
      ...userInputRest,
    }
    await addDoc(usersCollectionRef, googleDataToFirestore)
    return {
      email,
      uid,
      token,
      firstName: userInputRest.firstName,
      lastName: userInputRest.lastName,
    }
  } catch (err) {
    console.log(err.message)
  }
}

export const addUserFromDashboard = async (userData) => {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password,
    )
    const { password, ...userToFirestore } = userData
    let { creationTime, lastSignInTime } = user.user.metadata
    await addDoc(usersCollectionRef, {
      isAdmin: false,
      createdAt: new Date(creationTime),
      lastLoginAt: new Date(lastSignInTime),
      imgUrl: '/images/default-user.jpg',
      uid: user.user.uid,
      ...userToFirestore,
    })
    return {
      message: 'user successfully created',
    }
  } catch (err) {
    console.log(err.message)
    return { error: err.message }
  }
}

export const signUpWithEmailAndPassword = async (userData) => {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password,
    )
    const { confirmPassword, password, ...userToFirestore } = userData
    let { creationTime, lastSignInTime } = user.user.metadata
    await addDoc(usersCollectionRef, {
      isAdmin: false,
      createdAt: new Date(creationTime),
      lastLoginAt: new Date(lastSignInTime),
      imgUrl: '/images/default-user.jpg',
      uid: user.user.uid,
      ...userToFirestore,
    })
    console.log(user)
    return {
      email: user.user.email,
      uid: user.user.uid,
      token: user.user.stsTokenManager.accessToken,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: user.user.phoneNumber,
    }
  } catch (err) {
    console.log(err.message)
    return { error: err.message }
  }
}

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password)

    console.log('user')
    console.log(user)
    return {
      email: user.user.email,
      uid: user.user.uid,
      token: user.user.stsTokenManager.accessToken,
      phoneNumber: user.user.phoneNumber,
    }
  } catch (err) {
    console.log(err.message)
    return { error: err.message }
  }
}

export const getPuppiesData = async () => {
  try {
    const puppies = await getDocs(puppiesCollectionRef)
    const puppiesData = puppies.docs.map((doc) => {
      return {
        ...doc.data(),
        dob: timeStampToDateString(doc.data().dob),
        id: doc.id,
      }
    })
    return puppiesData
  } catch (err) {
    console.log(err.message)
  }
}

export const getPuppyData = async (puppyId) => {
  try {
    const puppyDocRef = doc(db, `puppies/${puppyId}`)
    const puppyDoc = await getDoc(puppyDocRef)
    const puppyDocData = puppyDoc.data()
    return puppyDocData
  } catch (err) {
    console.log(err.message)
  }
}

export const addPuppyData = async (puppyData) => {
  try {
    await addDoc(puppiesCollectionRef, puppyData)
  } catch (err) {
    console.log(err.message)
  }
}

export const updatePuppyData = async (puppyData) => {
  try {
    const puppyDoc = doc(db, 'puppies', puppyData?.id)
    await updateDoc(puppyDoc, puppyData)
  } catch (err) {
    console.log(err.message)
  }
}

export const deletePuppyData = async (puppyId) => {
  try {
    const userDoc = doc(db, 'puppies', puppyId)
    await deleteDoc(userDoc)
  } catch (err) {
    console.log(err.message)
  }
}

export const addBookedData = async (bookedData) => {
  try {
    await addDoc(bookedCollectionRef, bookedData)
  } catch (err) {
    console.log(err.message)
  }
}

export const getBookedData = async () => {
  try {
    const bookedDocs = await getDocs(bookedCollectionRef)
    const bookedData = bookedDocs.docs.map((doc) => {
      return { ...doc.data(), id: doc.id }
    })
    return bookedData
  } catch (err) {
    console.log(err.message)
  }
}

export const getUserActiveBook = async (email) => {
  try {
    const bookedQuery = query(
      bookedCollectionRef,
      where('requester_email', '==', email),
    )
    const bookedDocs = await getDocs(bookedQuery)
    if (bookedDocs) {
      const bookedDoc = bookedDocs.docs[0]
      return bookedDoc.data()
    }
  } catch (err) {
    console.log(err.message)
  }
}

export const setLastLoginAt = async (email) => {
  const userRef = query(collection(db, 'users'), where('email', '==', email))
  const findUsers = await getDocs(userRef)
  findUsers.forEach(async (user) => {
    const getUserRef = doc(db, 'users', user.id)
    await updateDoc(getUserRef, {
      lastLoginAt: new Date(),
    })
  })
}

export const getBiodata = async (email) => {
  const userRef = query(usersCollectionRef, where('email', '==', email))
  const findUsers = await getDocs(userRef);
  findUsers.forEach((doc) => {
    const data = doc.data()
    // console.log(data)
    return data
  });
  
}

export const updateBiodata = async (biodata) => {
  const userRef = query(usersCollectionRef, where('email', '==', biodata.email))
  const findUsers = await getDocs(userRef)
  findUsers.forEach(async (user) => {
    const getUserRef = doc(db, 'users', user.id)
    await updateDoc(getUserRef, {
      firstName: biodata.firstName,
      lastName: biodata.lastName,
      phoneNumber: biodata.phoneNumber,
      address: biodata.address,
    })
  })
}

export const getPricing = async () => {
  try {
    const pricing = await getDocs(pricingCollectionRef)
    const pricingData = pricing.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      }
    })
    return pricingData
  } catch (err) {
    console.log(err.message)
  }
}

export const updatePricing = async (pricingData) => {
  try {
    const pricingRef = doc(pricingCollectionRef, pricingData.id)
    await updateDoc(pricingRef, pricingData)
  } catch (err) {
    console.log(err.message)
  }
}
