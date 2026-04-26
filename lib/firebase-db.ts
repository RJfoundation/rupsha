import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ExamResult } from "@/types";

export const saveExamResult = async (result: Omit<ExamResult, "id" | "date">) => {
  try {
    await addDoc(collection(db, "examResults"), {
      ...result,
      date: serverTimestamp(),
    });
    console.log("Result saved to Firestore");
  } catch (error) {
    console.error("Error saving result:", error);
  }
};
