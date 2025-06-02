'use client';

import { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function UploadFiles() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedList, setUploadedList] = useState<string[]>([]);

  const MAX_SIZE_MB = 2;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.size <= MAX_SIZE_MB * 1024 * 1024);

    if (validFiles.length < files.length) {
      toast.warn('Some files exceeded the 2MB limit and were excluded.');
    }

    setSelectedFiles(validFiles);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    const token = localStorage.getItem('token');
    if (!token) return toast.error('Please log in first!');

    setUploading(true);

    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('files', file));

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success('🎉 Files uploaded successfully!');
        setUploadedList(data.files.map((f: any) => f.name));
        setSelectedFiles([]);
      } else {
        toast.error(data.error || 'Upload failed.');
      }
    } catch (err) {
      toast.error('Upload failed. Try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 font-sans bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Upload Knowledge Files</h2>

      <label className="flex flex-col items-center justify-center w-full h-52 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-dashed border-blue-400 hover:bg-blue-50 transition cursor-pointer">
        <FiUploadCloud className="text-blue-500 text-5xl mb-3" />
        <p className="text-gray-600 font-semibold">Click to upload or drag & drop files</p>
        <p className="text-xs text-gray-400 mt-1">Max size: 2MB per file</p>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
      </label>

      {selectedFiles.length > 0 && (
        <div className="mt-5 bg-gray-50 rounded-lg p-4 border">
          <h4 className="text-gray-700 font-medium mb-2">📁 Selected Files:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        disabled={selectedFiles.length === 0 || uploading}
        onClick={handleUpload}
        className={`mt-6 w-full py-3 px-4 text-white text-lg font-medium rounded-xl transition duration-300 ${
          uploading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {uploading ? 'Uploading...' : 'Upload Files'}
      </button>

      {uploadedList.length > 0 && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
          <h4 className="font-semibold mb-2">✅ Uploaded Files:</h4>
          <ul className="list-disc list-inside text-sm">
            {uploadedList.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
