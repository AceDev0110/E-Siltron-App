import Firebase from 'firebase';
let config = {
  apiKey: 'AIzaSyDdkc-Ay1xep99R2cQ1dXYQJCbomDtXQVE',
  authDomain: 'shahama-f7a55.firebaseapp.com',
  databaseURL: 'https://shahama-f7a55.firebaseio.com/',
  projectId: 'shahama-f7a55',
  storageBucket: 'gs://shahama-f7a55.appspot.com',
  messagingSenderId: '904303482079'
};
let app = Firebase.initializeApp(config);
export const firebaseDB = app.database();