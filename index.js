// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDXopIlLMqYYszvA-mqvJh9JG6hSVdV6VA",
    authDomain: "lab5-8c6a5.firebaseapp.com",
    projectId: "lab5-8c6a5",
    storageBucket: "lab5-8c6a5.appspot.com",
    messagingSenderId: "763494576097",
    appId: "1:763494576097:web:c0f34eace933b15df3aca0",
    measurementId: "G-H5BE5J6ME3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Firebase UI configuration
const uiConfig = {
    signInSuccessUrl: "index.html",
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: false
        }
    ]
};

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    const authEl = document.getElementById('auth-container'); // Make sure to have a div with this ID in your HTML
    if (user) {
        // User is signed in
        authEl.innerHTML = "";
        authEl.innerHTML += `<p>Welcome, ${user.email}!</p>`;
        authEl.innerHTML += '<button id="sign-out">Sign Out</button>';

        // Sign-out functionality
        document.getElementById('sign-out').addEventListener('click', () => {
            signOut(auth).then(() => {
                console.log("User signed out.");
            }).catch((error) => {
                console.error("Sign out error: ", error);
            });
        });
    } else {
        // User is signed out
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
        ui.start(authEl, uiConfig);
    }
});
