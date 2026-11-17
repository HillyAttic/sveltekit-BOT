import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore as getFirestoreAdmin } from 'firebase-admin/firestore'
import { getStorage as getStorageAdmin } from 'firebase-admin/storage'
import { getAuth as getAuthAdmin } from 'firebase-admin/auth'

let isInitialized = false
let initError: Error | null = null

function initializeFirebase() {
  if (isInitialized) return
  if (initError) throw initError

  if (getApps().length) {
    isInitialized = true
    return
  }

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON

  if (!serviceAccountJson) {
    initError = new Error('FIREBASE_SERVICE_ACCOUNT_JSON environment variable is not set')
    throw initError
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountJson.replace(/\n/g, '\\n'))

    initializeApp({
      credential: cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    })

    isInitialized = true
    console.log('Firebase Admin initialized successfully')
  } catch (error) {
    initError = error instanceof Error ? error : new Error(String(error))
    console.error('Failed to initialize Firebase Admin:', initError)
    throw initError
  }
}

export const getFirestore = () => {
  initializeFirebase()
  return getFirestoreAdmin()
}

export const getStorage = () => {
  initializeFirebase()
  return getStorageAdmin()
}

export const getAuth = () => {
  initializeFirebase()
  return getAuthAdmin()
}
