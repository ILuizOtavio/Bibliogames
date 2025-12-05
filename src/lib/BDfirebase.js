import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDYTmRMEaek5ddIsr07AykmioYiBsz6R_c",
  authDomain: "bibliogame-77537.firebaseapp.com",
  databaseURL: "https://bibliogame-77537-default-rtdb.firebaseio.com",
  projectId: "bibliogame-77537",
  storageBucket: "bibliogame-77537.appspot.com",
  messagingSenderId: "906992038648",
  appId: "1:906992038648:web:b3a76aa39961e855d8810d",
  measurementId: "G-H65VZBT9R5",
};

const app = initializeApp(firebaseConfig);

export const dbRealtime = getDatabase(app);
export const dbFirestore = getFirestore(app);

// ✔ agora o Storage está acessível
export const storage = getStorage(app);