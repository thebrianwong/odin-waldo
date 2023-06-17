const firebaseConfig = {
  apiKey: "AIzaSyAs7QKKlDh3aJxKDEcpm6kX_zb7zHEq4vI",
  authDomain: "odin-waldo-4b76b.firebaseapp.com",
  projectId: "odin-waldo-4b76b",
  storageBucket: "odin-waldo-4b76b.appspot.com",
  messagingSenderId: "758633860201",
  appId: "1:758633860201:web:4e03d8d7abcf41383726f8",
};

export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error(
      "No Firebase configuration object provided." +
        "\n" +
        "Add your web app's configuration object to firebase-config.js"
    );
  } else {
    return firebaseConfig;
  }
}
