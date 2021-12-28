import firebaseClient from "firebase/app";
import "firebase/auth";

/*

Copy/paste your *client-side* Firebase credentials below. 

To get these, go to the Firebase Console > open your project > Gear Icon >
Project Settings > General > Your apps. If you haven't created a web app
already, click the "</>" icon, name your app, and copy/paste the snippet.
Otherwise, go to Firebase SDK Snippet > click the "Config" radio button >
copy/paste.

*/
const CLIENT_CONFIG = {
  apiKey: "AIzaSyCtC3fr-3ZUNY1ZViFimVZts3EvZMpmtfw",
  authDomain: "clean-ly-1549911706182.firebaseapp.com",
  databaseURL: "https://clean-ly-1549911706182-default-rtdb.firebaseio.com",
  projectId: "clean-ly-1549911706182",
  storageBucket: "clean-ly-1549911706182.appspot.com",
  messagingSenderId: "850990738516",
  appId: "1:850990738516:web:4ee087eb64d24c4ec2d1c1",
  measurementId: "G-DFRSGDFBH9"
};

if (typeof window !== "undefined" && !firebaseClient.apps.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
  (window as any).firebase = firebaseClient;
}

export { firebaseClient };
