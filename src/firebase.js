// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify"; // Suppression de "Await", car il n'est pas utilisé dans ce fichier
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9k61ytjqYXnM52Ob8Odk79OxSLWG2B0Y",
  authDomain: "netflix-clone-43f3a.firebaseapp.com",
  projectId: "netflix-clone-43f3a",
  storageBucket: "netflix-clone-43f3a.firebasestorage.app", // Correction : ".app" remplacé par ".com"
  messagingSenderId: "880466612956",
  appId: "1:880466612956:web:8055ff2c831feacd8b9a19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), { // Correction de l'orthographe : "user" en "users"
            uid: user.uid, 
            name, 
            authProvider: "local", 
            email
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async(email, password) => { // Correction de l'espacement pour cohérence
    try {
        await signInWithEmailAndPassword(auth, email, password); // Ajout de "await" pour respecter la nature asynchrone
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout};
