// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {
    createUserWithEmailAndPassword,
    signOut,
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth'
import axios from "axios";


const firebaseConfig = {
    apiKey: "AIzaSyDE5BM4cvTw69Cs-pthg_Sx9AGXS8TKZXk",
    authDomain: "bobstore-8a731.firebaseapp.com",
    databaseURL: "https://bobstore-8a731-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bobstore-8a731",
    storageBucket: "bobstore-8a731.appspot.com",
    messagingSenderId: "992653670865",
    appId: "1:992653670865:web:65f131c3089a2259fd08f0",
    measurementId: "G-WYE6WTZ5BN"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const auth = getAuth()



export const storageData = () => {
    console.log('storage: ', storage)
}







export const createUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            console.log('user from createUser: ', user)
            console.log('auth: ', auth)
            localStorage.setItem('session_json', user.uid)
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.messages
            console.log('errorCode: ', errorCode)
            console.log('errorMessage: ', errorMessage)
        })
}

export const signInUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            console.log('user from signInUser: ', user)
            console.log('auth: ', auth)
            localStorage.setItem('session_json', user.uid)
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.messages
            console.log('errorCode: ', errorCode)
            console.log('errorMessage: ', errorMessage)
        })
}


export const signOutUser =  () => {
    return  signOut(auth)
        .then(() => {
            console.log('Sign-out successful')
            console.log('auth: ', auth)
            localStorage.setItem('session_json', null)
        })
        .catch(() => {
            console.log('An error happened')
        })
}


export const userObserver =  () => {
    onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                localStorage.setItem('session_json', uid)
                // console.log('Current user id: ', uid)
                // console.log('Current authenticate user ID: ', uid)
                // console.log('Current authenticate user: ', user)
            } else {
                // console.log('User is signed out')
            }
        }
    )
}


export const updateProfileHandled = async (login) =>{
    return await updateProfile(auth.currentUser, {
        displayName: `${login}`, photoURL: 'https://pickaface.net/gallery/avatar/unr_random_160817_0304_2mvqp69.png'
    }).then(() => {
        console.log('Profile Info updated')
    }).catch((error) => {
        console.log('An error occurred')
    });
}


