import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, getDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5HDVrTJ_eAGRymg9AdgJnbASLmpEW-V4",
  authDomain: "uniconnect-94b53.firebaseapp.com",
  databaseURL: "https://uniconnect-94b53-default-rtdb.firebaseio.com",
  projectId: "uniconnect-94b53",
  storageBucket: "uniconnect-94b53.firebasestorage.app",
  messagingSenderId: "839967365420",
  appId: "1:839967365420:web:341c951a46e28f0071f489",
  measurementId: "G-VT0TKJQQP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);



export async function getDBObject(type, ID){
  const docRef = doc(db, type, ID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  else {
    console.log("Error: Document not found");
  }
}

export async function updateProfile(type, ID, nameInput, bioInput) {
  const docRef = doc(db, type, ID);

  await updateDoc(docRef, {
    name: nameInput,
    bio: bioInput
  });
}


export async function updateOrganizations(type, ID, organizationList) {
  const docRef = doc(db, type, ID);

  await updateDoc(docRef, {
    organizations: organizationList
  });
}

export async function updateMembers(type, ID, memberList) {
  const docRef = doc(db, type, ID);

  await updateDoc(docRef, {
    members: memberList
  });
}

export async function updateFriends(type, ID, friendList) {
  const docRef = doc(db, type, ID);

  await updateDoc(docRef, {
    friends: friendList
  });
}

export async function updateRequests(type, ID, requests) {
  const docRef = doc(db, type, ID);

  await updateDoc(docRef, {
    friend_requests: requests
  });
}