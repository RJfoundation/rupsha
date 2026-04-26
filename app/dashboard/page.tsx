"use client";

import { useAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { availableSubjects } from "@/lib/questions";
import { LogOut } from "lucide-react";

export default function Dashboard() {
  const { user, logout, role } = useAuth();
  const router = useRouter();
  const [selectedSubjects, setSelectedSubjects] = useState<Record<string, string[]>>({});

  const toggleSubject = (subject: string) => {
    if (selectedSubjects[subject]) {
      const newSelected = { ...selectedSubjects };
      delete newSelected[subject];
      setSelectedSubjects(newSelected);
    } else {
      setSelectedSubjects({ ...selectedSubjects, [subject]: [] });
    }
  };

  const toggleChapter = (subject: string, chapter: string) => {
    const current = selectedSubjects[subject] || [];
    const newChapters = current.includes(chapter)
      ? current.filter(c => c !== chapter)
      : [...current, chapter];

    setSelectedSubjects({
      ...selectedSubjects,
      [subject]: newChapters
    });
  };

  const startExam = () => {
    const hasSelection = Object.keys(selectedSubjects).length > 0;
    if (!hasSelection) {
      alert("অন্তত একটা সাবজেক্ট ও চ্যাপ্টার সিলেক্ট করুন");
      return;
    }
    // পরে exam page-এ query param দিয়ে পাঠানো যাবে
    router.push("/exam");
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-bold">স্বাগতম, {user?.displayName || "ইমরান"} 👋</h1>
            <p className="text-gray-400 mt-2">আজ কোন পরীক্ষা দিতে চান?</p>
          </div>
          <Button variant="destructive" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" /> লগআউট
          </Button>
        </div>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-3xl">সাবজেক্ট ও চ্যাপ্টার নির্বাচন করুন</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {Object.keys(availableSubjects).map((subject) => (
              <div key={subject} className="border-b border-gray-800 pb-6 last:border-0">
                <div className="flex items-center gap-3 mb-4">
                  <Checkbox 
                    id={subject}
                    checked={!!selectedSubjects[subject]}
                    onCheckedChange={() => toggleSubject(subject)}
                  />
                  <label htmlFor={subject} className="text-2xl font-semibold cursor-pointer">
                    {subject}
                  </label>
                </div>

                {selectedSubjects[subject] && (
                  <div className="ml-10 grid grid-cols-2 gap-4">
                    {availableSubjects[subject].map((chapter) => (
                      <div key={chapter} className="flex items-center gap-2">
                        <Checkbox
                          id={`\( {subject}- \){chapter}`}
                          checked={selectedSubjects[subject].includes(chapter)}
                          onCheckedChange={() => toggleChapter(subject, chapter)}
                        />
                        <label htmlFor={`\( {subject}- \){chapter}`} className="cursor-pointer">
                          {chapter}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Button onClick={startExam} size="lg" className="w-full text-lg py-7">
              পরীক্ষা শুরু করুন →
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
