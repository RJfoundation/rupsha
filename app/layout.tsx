import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "ExamPro - অফিসিয়াল পরীক্ষা প্ল্যাটফর্ম",
  description: "প্রো লেভেলের অনলাইন এক্সাম সিস্টেম",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="dark">
      <body className="bg-gray-950 text-gray-100">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
