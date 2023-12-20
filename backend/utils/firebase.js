import admin from 'firebase-admin'
import { getAuth } from 'firebase-admin/auth'
// import serviceAccount from '../serviceAccountKey.json' assert { type: 'json' }

// Firebase setup
const app = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
})

export const getUserGoogleAuth = async (accessToken) => {
  const decodedToken = await app.auth().verifyIdToken(accessToken)
  const user = {
    name: decodedToken.name,
    email: decodedToken.email,
  }
  return user
}
