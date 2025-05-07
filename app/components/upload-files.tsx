'use client';

import { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function UploadFiles() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedList, setUploadedList] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles) return;

    setUploading(true);

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append('files', file);
    });

    formData.append('uploadedBy', 'admin@talksy.ai'); // replace with dynamic user

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        toast.success('🎉 Files uploaded!');
        setUploadedList(data.files.map((file: any) => file.name));
        setSelectedFiles(null);
      } else {
        toast.error('Something went wrong!');
      }
    } catch (err) {
      toast.error('Upload failed!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Knowledge Files</h2>
      <label className="flex flex-col items-center justify-center w-full h-48 bg-blue-50 rounded-lg border-2 border-dashed border-blue-300 cursor-pointer hover:bg-blue-100 transition duration-300">
        <FiUploadCloud className="text-blue-600 text-4xl mb-2" />
        <p className="text-gray-600 font-medium">Click to browse or drag files here</p>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
      </label>

      {selectedFiles && (
        <div className="mt-4">
          <h4 className="text-sm text-gray-500 font-semibold">Files Selected:</h4>
          <ul className="list-disc pl-6 text-sm text-gray-700">
            {Array.from(selectedFiles).map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        disabled={!selectedFiles || uploading}
        onClick={handleUpload}
        className={`mt-6 w-full py-2 px-4 text-white rounded-lg transition duration-300 ${
          uploading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {uploading ? 'Uploading...' : 'Upload Files'}
      </button>

      {uploadedList.length > 0 && (
        <div className="mt-6 text-sm text-green-600">
          <h4 className="font-semibold mb-2">✅ Uploaded Files:</h4>
          <ul className="list-disc pl-6">
            {uploadedList.map((name, i) => (
              <li key={i}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
