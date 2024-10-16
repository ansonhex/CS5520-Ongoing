import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseSetup";

export async function writeToDB(collectionName, goal) {
  try {
    const docRef = await addDoc(collection(db, collectionName), goal);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export async function deleteFromDB(collectionName, docId) {
  try {
    await deleteDoc(doc(db, collectionName, docId));
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
