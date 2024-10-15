import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseSetup";

export async function writeToDB(collectionName, goal) {
  try {
    const docRef = await addDoc(collection(db, collectionName), goal);
    console.log("Document written with ID: ", docRef.id);
    return docRef
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
