const { initializeApp, cert, getApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getAuth } = require('firebase-admin/auth')
const serviceAccount = require('./secret.json')

let fbAdmin
try {
  fbAdmin = getApp()
} catch {
  fbAdmin = initializeApp({
    credential: cert(serviceAccount),
    databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
  })
}

export const db = getFirestore(fbAdmin)
export const auth = getAuth(fbAdmin)
