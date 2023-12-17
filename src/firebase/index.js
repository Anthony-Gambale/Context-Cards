import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth, signInWithPopup,
  signOut
} from 'firebase/auth'
// import {
//   onSnapshot, getFirestore,
//   collection, addDoc, doc, deleteDoc,
//   query, orderBy, where
// } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC0uPkuEpVmxqDUKgZBKXflW-kODhbJmFw',
  authDomain: 'context-cards-138ab.firebaseapp.com',
  projectId: 'context-cards-138ab',
  storageBucket: 'context-cards-138ab.appspot.com',
  messagingSenderId: '157514515245',
  appId: '1:157514515245:web:cbe5f0903878c089be49a4'
}

// let query = null
const app = initializeApp(firebaseConfig)
// const db = getFirestore(app)
// const ref = collection(db, 'tasks')
const provider = new GoogleAuthProvider()
const auth = getAuth()

// state variables
let userData = null
let writeLoggedIn = () => { }

console.log(app)

auth.onAuthStateChanged((user) => {
  if (user) {
    userData = user
    writeLoggedIn(1)
  } else {
    userData = null
    // writeLoggedIn(2)
    writeLoggedIn(3)
  }
})

// get write logged in
function passWriteLoggedIn(fn) {
  writeLoggedIn = fn
}

// login button
function beginAuth() {
  signInWithPopup(auth, provider)
}

// logout button
function endAuth() {
  signOut(auth).then(() => {
    writeLoggedIn(2)
    userData = null
  }).catch((error) => {
    console.log(error)
  })
}

// tatoeba API
function search(word, targetLanguage, passResult) {
  const base = 'https://dashing-occipital-yarn.glitch.me/'
  const urls = [
    base + `?from=${targetLanguage}&to=eng&query=${encodeURIComponent(word)}`,
    base + `?from=eng&to=${targetLanguage}&query=${encodeURIComponent(word)}`
  ]

  console.log(urls)

  const responses = urls.map(url => fetch(url)
    .then(response => response.json()))

  Promise.all(responses)
    .then(results => {
      const toEnglish = results[0].results
        .map(item => {
          if (item.translations[0][0]) {
            return {
              english: item.translations[0][0].text,
              targetLanguage: item.text
            }
          } else {
            return null
          }
        })
        .filter(item => item !== null)

      const fromEnglish = results[1].results
        .map(item => {
          if (item.translations[0][0]) {
            return {
              english: item.text,
              targetLanguage: item.translations[0][0].text
            }
          } else {
            return null
          }
        })
        .filter(item => item !== null)

      if (fromEnglish.length > toEnglish.length) {
        passResult(fromEnglish)
      } else {
        passResult(toEnglish)
      }
    })
}

export {
  beginAuth, endAuth, userData, passWriteLoggedIn, search
}
