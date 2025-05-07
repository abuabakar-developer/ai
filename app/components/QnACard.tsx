'use client';

import { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

interface QnA {
  _id: string;
  question: string;
  answer: string;
}

interface QnACardProps {
  qa: QnA;
  onUpdate: (id: string, updatedData: { question: string; answer: string }) => void;
  onDelete: (id: string) => void;
}

const QnACard: React.FC<QnACardProps> = ({ qa, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [question, setQuestion] = useState(qa.question);
  const [answer, setAnswer] = useState(qa.answer);

  const handleUpdate = () => {
    onUpdate(qa._id, { question, answer });
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-start">
      <div className="flex-1">
        {isEditing ? (
          <>
            <input
              className="w-full border p-1 mb-2"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <textarea
              className="w-full border p-1"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </>
        ) : (
          <>
            <h4 className="font-bold">{qa.question}</h4>
            <p className="text-gray-700">{qa.answer}</p>
          </>
        )}
      </div>
      <div className="space-x-2 ml-4">
        {isEditing ? (
          <button onClick={handleUpdate} className="text-blue-600 font-semibold">
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="text-blue-600">
            <FiEdit />
          </button>
        )}
        <button onClick={() => onDelete(qa._id)} className="text-red-600">
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default QnACard;
