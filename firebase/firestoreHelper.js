import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseSetup";

export async function writeToDB(goal, collectionName) {
  try {
    const docRef = await addDoc(collection(db, collectionName), goal);
    console.log("Document written with ID: ", docRef.id);
    return docRef
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}
