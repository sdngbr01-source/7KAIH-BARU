// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCDmui8vy85LQDgh_LG1llsOxocQhD5JFo",
    authDomain: "kebiasaan-indonesia.firebaseapp.com",
    projectId: "kebiasaan-indonesia",
    storageBucket: "kebiasaan-indonesia.firebasestorage.app",
    messagingSenderId: "1083238000129",
    appId: "1:1083238000129:web:b4aa1f596fbfc37c3a0200"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const USERS_COLLECTION = 'users';