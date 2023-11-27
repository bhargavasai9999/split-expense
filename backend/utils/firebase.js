import admin from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'
import serviceAccount from '../serviceAccountKey.json' assert { type: 'json' }

// Firebase setup
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const getUserGoogleAuth = async (accessToken) => {
  try {
    const decodedToken = await getAuth(admin).verifyIdToken(accessToken)
    console.log(decodedToken)
  } catch (err) {}
}
