import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { authenticate, database } from "./configuration";

export async function registerUser(email: string, password: string, displayName: string) {
  const userCredential = await createUserWithEmailAndPassword(authenticate, email, password);
  const user = userCredential.user;

  await updateProfile(user, { displayName });

  await setDoc(doc(database, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    displayName,
    createdAt: serverTimestamp(),
  });

  return user;
}

export async function loginUser(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(authenticate, email, password);
  return userCredential.user;
}
