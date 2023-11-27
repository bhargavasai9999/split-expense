import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDE3aRvjzxeDgZ1CkdPMv864Z9-NwB9yjw',
  authDomain: 'split-expense-c371f.firebaseapp.com',
  projectId: 'split-expense-c371f',
  storageBucket: 'split-expense-c371f.appspot.com',
  messagingSenderId: '350496985299',
  appId: '1:350496985299:web:a9ab391380e77471a54426',
}

export const googleOauthPopup = async () => {
  const provider = new GoogleAuthProvider()

  const auth = getAuth()
  try {
    const result = await signInWithPopup(auth, provider)
    return result.user.getIdToken()
    // ...
  } catch (error) {
    console.log(error)
  }
}
