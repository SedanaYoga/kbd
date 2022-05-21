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
const breedQualityRef = doc(pricingCollectionRef, 'breedQuality')
const colorRef = doc(pricingCollectionRef, 'color')

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(auth, provider)
    const { email, displayName, metadata, photoURL } = result.user
    const userRef = query(
      usersCollectionRef,
      where('email', '==', result.user.email),
    )
    const querySnapshot = await getDocs(userRef)

    if (querySnapshot.docs.length === 0) {
      const createdAt = new Date(metadata.creationTime)
      const lastLoginAt = new Date(metadata.lastSignInTime)
      const imgUrl = photoURL
      const userToFirestore = {
        email,
        displayName,
        createdAt,
        lastLoginAt,
        imgUrl,
        isAdmin: false,
        isGoogle: true,
      }
      console.log('Creating User to Firestore')

      await addDoc(usersCollectionRef, userToFirestore)
      console.log(result.user)
      return { email: result.user.email, uid: result.user.uid, token: result.user.stsTokenManager.accessToken }
    } else {
      querySnapshot.forEach(async (user) => {
        const getUserRef = doc(db, 'users', user.id)
        await updateDoc(getUserRef, {
          lastLoginAt: new Date(),
        })
      })
      console.log('User exists')
      console.log(result.user)
      return { email: result.user.email, uid:result.user.uid, token:result.user.stsTokenManager.accessToken }
    }
  } catch (err) {
    console.log(err)
    return { error:err }
  }
}

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password)
    console.log(user)
    return { email: user.user.email, uid:user.user.uid, token:user.user.stsTokenManager.accessToken }
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
    const { confirmPassword, ...userToFirestore } = userData
    let { creationTime, lastSignInTime } = user.user.metadata
    await addDoc(usersCollectionRef, {
      isAdmin: false,
      createdAt: new Date(creationTime),
      lastLoginAt: new Date(lastSignInTime),
      isGoogle: false,
      imgUrl: '/image/default-user.jpg',
      ...userToFirestore,
    })
    console.log(user)
    return { email: user.user.email, uid:user.user.uid, token:user.user.stsTokenManager.accessToken }
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
