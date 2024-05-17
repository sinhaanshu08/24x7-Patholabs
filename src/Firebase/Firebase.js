// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyApZ3UTOoVj1OUPbLp1MGExiTAhrFLO-6c",
//   authDomain: "patholabs-24x7.firebaseapp.com",
//   projectId: "patholabs-24x7",
//   storageBucket: "patholabs-24x7.appspot.com",
//   messagingSenderId: "491868787112",
//   appId: "1:491868787112:web:574af1bb98bf48b2f7cd9d"
// };


// const firebaseApp = initializeApp(firebaseConfig);
// const db = getDatabase(firebaseApp);
// const auth = getAuth(firebaseApp);

// export {auth, db };
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApZ3UTOoVj1OUPbLp1MGExiTAhrFLO-6c",
  authDomain: "patholabs-24x7.firebaseapp.com",
  projectId: "patholabs-24x7",
  storageBucket: "patholabs-24x7.appspot.com",
  messagingSenderId: "491868787112",
  appId: "1:491868787112:web:574af1bb98bf48b2f7cd9d"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

export {auth, db , firebaseApp};
