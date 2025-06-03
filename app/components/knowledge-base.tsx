"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/Textarea";
import { Card, CardContent } from "./ui/Card";
import { Upload } from "lucide-react";
import { toast } from "react-toastify";
import { Input } from "./ui/Input";

// QnA Types
interface QA {
  _id?: string;
  question: string;
  answer: string;
}

export default function KnowledgeBaseEditor({ email }: { email: string }) {
  const [faqList, setFaqList] = useState<QA[]>([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch QnA data from API
  const fetchQnAs = async () => {
    setLoading(true);
    const res = await fetch(`/api/knowledgebase?email=${email}`);
    const data = await res.json();
    setFaqList(data);
    setLoading(false);
  };

  useEffect(() => {
    if (email) fetchQnAs();
  }, [email]);

  // Add QnA to knowledge base
  const handleAddQA = async () => {
    if (!question || !answer) {
      toast.error("Please fill both fields");
      return;
    }

    const newQA = { question, answer, email };
    const res = await fetch("/api/knowledgebase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQA),
    });

    if (res.ok) {
      toast.success("FAQ added!");
      fetchQnAs();
    }
  };

  // Remove QnA from knowledge base
  const handleRemoveQA = async (id: string) => {
    const res = await fetch(`/api/knowledgebase/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("FAQ removed");
      fetchQnAs();
    }
  };

  // Handle file upload to train chatbot
  const handleUpload = async () => {
    if (!file) return toast.error("No file selected");

    const formData = new FormData();
    formData.append("file", file);

    // Simulate upload or send to API route like /api/train
    const res = await fetch("/api/train", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      toast.success("File uploaded for training!");
    } else {
      toast.error("Error uploading file");
    }

    setFile(null);
  };

  return (
    <div className="max-w-4xl font-sans mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-800 mb-4">Knowledge Base Editor</h2>

      {/* Add Q&A */}
      <Card className="mb-6">
        <CardContent className="p-4 space-y-3">
          <Input
            placeholder="Enter a customer question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Textarea
            placeholder="Type the bot's answer..."
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <Button onClick={handleAddQA}>Add Q&A</Button>
        </CardContent>
      </Card>

      {/* Q&A List */}
      {faqList.length > 0 && (
        <div className="space-y-4">
          {faqList.map((faq) => (
            <Card key={faq._id}>
              <CardContent className="p-4 flex justify-between items-start">
                <div>
                  <p className="font-semibold">Q: {faq.question}</p>
                  <p className="text-gray-600 mt-1">A: {faq.answer}</p>
                </div>
                <Button variant="ghost" onClick={() => handleRemoveQA(faq._id!)}>
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* File Upload */}
      <Card className="mt-8">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2">Upload PDF/Doc to train bot</h3>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <Button onClick={handleUpload}>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>
          {file && <p className="text-sm mt-2">Selected: {file.name}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
