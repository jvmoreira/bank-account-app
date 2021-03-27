import firebase from 'firebase/app';

export function setupFirebase(): void {
  const firebaseConfig = getFirebaseConfig();
  firebase.initializeApp(firebaseConfig);
}

function getFirebaseConfig(): FirebaseConfig {
  return {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY || '',
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.VUE_APP_FIREBASE_APP_ID || '',
  };
}

type FirebaseConfig = {
  apiKey: string,
  authDomain: string,
  projectId: string,
  storageBucket: string,
  messagingSenderId: string,
  appId: string,
}
