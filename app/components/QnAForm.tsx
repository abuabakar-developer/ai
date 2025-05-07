'use client';

import { useState } from 'react';

interface QnAFormProps {
  onSave: (data: { question: string; answer: string }) => void;
}

const QnAForm: React.FC<QnAFormProps> = ({ onSave }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question || !answer) return;
    onSave({ question, answer });
    setQuestion('');
    setAnswer('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Enter question"
        className="w-full p-2 border rounded-lg"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <textarea
        placeholder="Enter answer"
        className="w-full p-2 border rounded-lg"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 text-2xl sm:1xl rounded hover:bg-blue-700"
      >
        <span className="text-white text-2xl">+</span> ADD KNOWLEDGE BASE
      </button>
    </form>
  );
};

export default QnAForm;
