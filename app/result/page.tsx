"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { saveExamResult } from "@/lib/firebase-db";
import { useAuth } from "@/components/auth-context";

export default function ResultPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [percentage, setPercentage] = useState(0);

  // এখানে query param বা state থেকে score নেওয়া যাবে (আপাতত hardcoded)
  useEffect(() => {
    const calculatedScore = 7;   // পরে dynamic করো
    const calculatedTotal = 10;
    setScore(calculatedScore);
    setTotal(calculatedTotal);
    setPercentage(Math.round((calculatedScore / calculatedTotal) * 100));

    // Firestore-এ সেভ করো
    if (user) {
      saveExamResult({
        userId: user.uid,
        subject: "Mixed Subjects",
        score: calculatedScore,
        totalQuestions: calculatedTotal,
        percentage: Math.round((calculatedScore / calculatedTotal) * 100),
      });
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-6">
      <Card className="w-full max-w-2xl bg-gray-900 border-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-5xl font-bold text-green-500">পরীক্ষা সম্পূর্ণ!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-8 py-12">
          <div className="text-8xl font-bold">{percentage}%</div>
          <p className="text-3xl">স্কোর: {score} / {total}</p>

          <div className="flex justify-center gap-4">
            <Button onClick={() => router.push("/dashboard")} size="lg">
              ড্যাশবোর্ডে ফিরে যান
            </Button>
            <Button onClick={() => router.push("/exam")} variant="outline" size="lg">
              আবার পরীক্ষা দিন
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
