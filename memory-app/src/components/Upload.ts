import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

export function firestoreUpload(file: any, filename: string) {
    const storageRef = ref(storage, filename)
    return uploadBytesResumable(storageRef, file);
}