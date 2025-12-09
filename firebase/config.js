import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "bibliogame-77537.firebaseapp.com",
  databaseURL: "https://bibliogame-77537-default-rtdb.firebaseio.com",
  projectId: "bibliogame-77537",
  storageBucket: "bibliogame-77537.appspot.com", // IMPORTANTE
  messagingSenderId: "906992038648",
  appId: "1:906992038648:web:b3a76aa39961e855d8810d",
};

const app = initializeApp(firebaseConfig);

export const dbRealtime = getDatabase(app);
export const storage = getStorage(app);
