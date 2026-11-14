'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { ApiResponse, Lecture } from '@/app/lib/lecture-types';

const Page = () => {
  const [courses, setCourses] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

    fetch(`${serverUrl.replace(/\/+$/, '')}/api/lectures`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data from server');
        return res.json();
      })
      .then((data: ApiResponse<Lecture[]>) => {
        if (data.success) {
          setCourses(data.data);
        }
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Failed to fetch data from server');
        setLoading(false);
      });
  }, []);

  // Filter items based on selected category tab (fixed property name to 'category')
  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <p className="text-lg font-semibold text-slate-700 animate-pulse">Loading items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-center shadow-lg">
          <p className="text-red-600 font-semibold text-lg mb-1">Could not connect to backend</p>
          <p className="text-sm text-slate-600">Error: {error}</p>
          <p className="text-xs text-slate-500 mt-2">Make sure your Express server is running on port 5000.</p>
        </div>
      </div>
    );
  }

  const categories = ['All', 'Frontend', 'Backend', 'Fullstack', 'Database', 'Others'];

  return (
    <div className="bg-orange-50/50 min-h-screen">
      <div className="min-h-screen w-full bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12 min-h-screen max-w-7xl">
          
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Course & Video Catalog
            </h1>
            <p className="text-slate-600 text-sm">
              Explore tutorials and masterclasses across different technology categories.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition shadow-sm cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-orange-300 text-slate-950 shadow-orange-200 shadow-md font-extrabold'
                    : 'bg-white text-slate-700 hover:bg-orange-100 border border-orange-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          {filteredCourses.length === 0 ? (
            <div className="text-center py-20 bg-white/50 rounded-2xl border border-dashed border-orange-200">
              <p className="text-slate-600 font-medium">No items found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((item) => (
                <Link
                  key={item._id}
                  href={`/courses/${encodeURIComponent(item._id)}`}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100 flex flex-col transition duration-300 hover:-translate-y-1 hover:shadow-2xl group"
                >
                  {/* Thumbnail & Price Header */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 right-4 bg-orange-300 text-slate-950 font-bold px-3 py-1 rounded-full text-sm shadow-md">
                      ${item.price}
                    </span>
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-800 font-bold px-3 py-1 rounded-md text-xs shadow-sm uppercase tracking-wider border border-orange-100">
                      {item.category}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-amber-600 transition">
                      {item.title}
                    </h2>
                    <p className="text-slate-600 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-orange-100 mt-auto">
                      <span className="block w-full text-center bg-orange-100 group-hover:bg-orange-300 text-slate-900 text-sm font-semibold py-2.5 rounded-xl transition shadow-sm">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Page;