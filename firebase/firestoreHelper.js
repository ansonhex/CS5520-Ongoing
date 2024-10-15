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