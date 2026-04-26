"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { sampleQuestions } from "@/lib/questions";
import { Clock, Flag } from "lucide-react";

export default function ExamPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [questions] = useState(sampleQuestions.slice(0, 10)); // প্রথম ১০টা প্রশ্ন
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 মিনিট
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const currentQuestion = questions[currentIndex];

  const selectAnswer = (answer: string) => {
    setUserAnswers({ ...userAnswers, [currentQuestion.id]: answer });
  };

  const toggleFlag = () => {
    if (flagged.includes(currentIndex)) {
      setFlagged(flagged.filter(i => i !== currentIndex));
    } else {
      setFlagged([...flagged, currentIndex]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    let score = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.answer) score++;
    });

    const percentage = Math.round((score / questions.length) * 100);
    alert(`পরীক্ষা শেষ! তোমার স্কোর: \( {score}/ \){questions.length} (${percentage}%)`);
    router.push("/dashboard");
  };

  if (isSubmitted) return <div className="text-center py-20">Result Processing...</div>;

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-gray-900 p-6 rounded-3xl">
          <div>
            <h1 className="text-3xl font-bold">Online Exam</h1>
            <p className="text-gray-400">প্রশ্ন {currentIndex + 1} / {questions.length}</p>
          </div>
          <div className="flex items-center gap-6 text-2xl font-mono text-red-500">
            <Clock className="w-6 h-6" />
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
          <Button onClick={handleSubmit} variant="destructive">জমা দিন</Button>
        </div>

        <div className="flex gap-8">
          {/* Question Area */}
          <div className="flex-1">
            <Card className="bg-gray-900 border-gray-800 p-10">
              <h2 className="text-xl font-semibold mb-8">{currentQuestion.question}</h2>
              <div className="space-y-4">
                {currentQuestion.options.map((option, idx) => (
                  <div
                    key={idx}
                    onClick={() => selectAnswer(option)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      userAnswers[currentQuestion.id] === option 
                        ? "border-blue-500 bg-blue-950" 
                        : "border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex justify-between mt-6">
              <Button 
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                disabled={currentIndex === 0}
              >
                পূর্ববর্তী
              </Button>
              <Button onClick={toggleFlag} variant="outline" className="flex items-center gap-2">
                <Flag className="w-4 h-4" /> {flagged.includes(currentIndex) ? "Unflag" : "Flag for Review"}
              </Button>
              <Button 
                onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
                disabled={currentIndex === questions.length - 1}
              >
                পরবর্তী
              </Button>
            </div>
          </div>

          {/* Question Palette */}
          <div className="w-80">
            <Card className="bg-gray-900 border-gray-800 p-6 sticky top-6">
              <h3 className="font-semibold mb-4">প্রশ্ন প্যালেট</h3>
              <div className="grid grid-cols-5 gap-3">
                {questions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-12 rounded-xl font-medium transition-all ${
                      currentIndex === idx 
                        ? "bg-blue-600 text-white" 
                        : userAnswers[questions[idx].id] 
                        ? "bg-green-600" 
                        : flagged.includes(idx) 
                        ? "bg-yellow-500 text-black" 
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
