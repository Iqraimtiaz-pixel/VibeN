import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// 🔐 PASTE YOUR OWN KEY HERE
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Signup
window.signup = async function () {
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;

  await createUserWithEmailAndPassword(auth, email, pass);
  alert("Account Created");
};

// Login
window.login = async function () {
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;

  await signInWithEmailAndPassword(auth, email, pass);
  window.location.href = "feed.html";
};

// Chat
window.sendMsg = async function () {
  let msg = document.getElementById("msg").value;

  await addDoc(collection(db, "messages"), {
    text: msg,
    time: Date.now()
  });

  document.getElementById("msg").value = "";
};

onSnapshot(collection(db, "messages"), (snapshot) => {
  let chatBox = document.getElementById("chatBox");
  if (!chatBox) return;

  chatBox.innerHTML = "";

  snapshot.forEach(doc => {
    let div = document.createElement("div");
    div.innerText = doc.data().text;
    chatBox.appendChild(div);

    setTimeout(() => div.remove(), 5000);
  });
});