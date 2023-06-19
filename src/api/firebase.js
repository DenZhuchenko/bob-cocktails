import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth'
//npm install -g firebase-tools//

const firebaseConfig = {

    apiKey: "AIzaSyDE5BM4cvTw69Cs-pthg_Sx9AGXS8TKZXk",
    authDomain: "bobstore-8a731.firebaseapp.com",
    databaseURL: "https://bobstore-8a731-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bobstore-8a731",
    storageBucket: "bobstore-8a731.appspot.com",
    messagingSenderId: "992653670865",
    appId: "1:992653670865:web:8a41874420cb155dfd08f0",
    measurementId: "G-DBMD3BRGY0"

};

export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
export const auth = getAuth()


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
            console.log('user logged in: ', user)
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.messages
            console.log('errorCode: ', errorCode)
            console.log('errorMessage: ', errorMessage)
        })
}

export const signOutUser = () => {
    return signOut(auth)
        .then(() => {
            console.log('Sign-out successful')
            console.log('auth: ', auth)
            localStorage.setItem('session_json', null)
        })
        .catch(() => {
            console.log('An error happened')
        })
}

export const userObserver = async () => {
    await onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('uid from userObserver: ', user.uid)
                return user.uid;
            }
            return null
        }
    )
}


export const updateProfileHandled = async (login) => {
    return await updateProfile(auth.currentUser, {
        displayName: `${login}`, photoURL: 'https://pickaface.net/gallery/avatar/unr_random_160817_0304_2mvqp69.png'
    }).then(() => {
        console.log('Profile Info updated')
    }).catch((error) => {
        console.log('An error occurred')
    });
}
