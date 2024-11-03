import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  updateDoc,
  query,
} from "firebase/firestore";
import { db, auth } from "./firebaseSetup";

export async function writeToDB(collectionName, goal) {
  try {
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    if (!userId) {
      console.error("User not signed in");
      return;
    }
    const goalWithOwner = { ...goal, owner: userId };
    const docRef = await addDoc(collection(db, collectionName), goalWithOwner);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export async function deleteFromDB(collectionName, docId) {
  try {
    await deleteDoc(doc(db, collectionName, docId));
    deleteAllFromDB(`Goals/${docId}/Users`);
    console.log("Document deleted with ID: ", docId);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}

export async function deleteAllFromDB(collectionName) {
  try {
    const docs = await getDocs(collection(db, collectionName));
    docs.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  } catch (error) {
    console.error("Error deleting all documents: ", error);
  }
}

export async function updateWarning(collectionName, docId) {
  try {
    const goalRef = doc(db, collectionName, docId);
    await updateDoc(goalRef, {
      warning: true, // update warning field to true
    });
    console.log("Document updated with ID: ", docId);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

export async function getAllDocuments(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = [];

    // Loop through documents and push data into the array
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
    }

    console.log("Documents data: ", data);
    return data;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}
