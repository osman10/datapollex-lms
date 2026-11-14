'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';

const CATEGORIES = ['Frontend', 'Backend', 'Fullstack', 'Database', 'Others'];

export default function LectureForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    category: 'Frontend',
    price: '',
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | ''; text: string }>({
    type: '',
    text: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (!thumbnailFile) {
        throw new Error('Please select a thumbnail image.');
      }

      // Step 1: Upload image to ImgBB
      const imgbbData = new FormData();
      imgbbData.append('image', thumbnailFile);

      const imgbbApiKey = '3c43c7313425a248269ec2a599289d78';
      const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: imgbbData,
      });

      const imgbbResult = await imgbbResponse.json();

      if (!imgbbResult.success) {
        throw new Error(imgbbResult.error?.message || 'Failed to upload image to ImgBB.');
      }

      const thumbnailUrl = imgbbResult.data.url;

      // Step 2: Submit lecture form data + thumbnailUrl to your server
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';
      
      const payload = {
        ...formData,
        price: Number(formData.price),
        thumbnailUrl,
      };

      const serverResponse = await fetch(`${serverUrl.replace(/\/+$/, '')}/api/lectures`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const serverResult = await serverResponse.json();

      if (!serverResponse.ok) {
        throw new Error(serverResult.message || 'Failed to save lecture on the server.');
      }

      setMessage({ type: 'success', text: 'Lecture created successfully!' });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        videoUrl: '',
        category: 'Frontend',
        price: '',
      });
      setThumbnailFile(null);
      form.reset();

    } catch (err) {
      setMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'An unexpected error occurred.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Lecture</h2>

      {message.text && (
        <div
          className={`p-4 mb-4 rounded text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g. Advanced Next.js Architecture"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            required
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Detailed overview of the lecture..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
            <input
              type="url"
              name="videoUrl"
              required
              value={formData.videoUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              name="price"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-400 hover:file:bg-orange-100 cursor-pointer"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-orange-300 hover:bg-orange-400 text-white font-medium rounded-md transition duration-200 disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Processing & Uploading...' : 'Create Lecture'}
        </button>
      </form>
    </div>
  );
}