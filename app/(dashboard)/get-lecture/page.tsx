"use client";

import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import Link from "next/link";

interface Lecture {
    _id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    category: string;
    price: number;
}

const AdminLecturesPage = () => {
    const [lectures, setLectures] = useState<Lecture[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Edit Modal State
    const [editingLecture, setEditingLecture] = useState<Lecture | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const API_BASE = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

    // Fetch all lectures on mount
    const fetchLectures = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_BASE}/api/lectures`);
            const data = await res.json();
            if (data.success) {
                setLectures(data.data);
            } else {
                setError("Failed to load lectures");
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to load lectures");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLectures();
    }, []);

    // Handle Delete
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this lecture?")) return;

        try {
            const res = await fetch(`${API_BASE}/api/lectures/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (res.ok) {
                setLectures(lectures.filter((item) => item._id !== id));
            } else {
                alert(data.message || "Failed to delete lecture");
            }
        } catch (err: unknown) {
            alert("Error deleting lecture: " + (err instanceof Error ? err.message : "Unknown error"));
        }
    };

    // Open Edit Modal
    const handleEditClick = (lecture: Lecture) => {
        setEditingLecture({ ...lecture });
        setIsEditModalOpen(true);
    };

    // Handle Edit Form Submission
    const handleUpdateSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const lectureToUpdate = editingLecture;
        if (!lectureToUpdate) return;

        try {
            const res = await fetch(`${API_BASE}/api/lectures/${lectureToUpdate._id}`, {
                method: "PUT", // or PATCH depending on your backend
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(lectureToUpdate),
            });
            const data = await res.json();

            if (res.ok) {
                setLectures(lectures.map((item) => (item._id === lectureToUpdate._id ? data.data || lectureToUpdate : item)));
                setIsEditModalOpen(false);
                setEditingLecture(null);
                fetchLectures(); // Refresh data
            } else {
                alert(data.message || "Failed to update lecture");
            }
        } catch (err: unknown) {
            alert("Error updating lecture: " + (err instanceof Error ? err.message : "Unknown error"));
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-orange-50">
                <p className="text-lg font-semibold text-slate-700 animate-pulse">Loading admin dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-orange-50">
                <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-center shadow-lg">
                    <p className="text-red-600 font-semibold text-lg mb-1">Dashboard Error</p>
                    <p className="text-sm text-slate-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[url('/images/bg.jpg')] bg-center bg-cover bg-white min-h-screen">
            <div className="h-full w-full bg-white/60 backdrop-blur-sm min-h-screen">
                <div className="container mx-auto min-h-screen px-4 py-8 max-w-7xl">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900">Manage Lectures</h1>
                            <p className="text-sm text-slate-600">View, edit, or delete your platform lectures.</p>
                        </div>
                        <Link
                            href="/create-lecture"
                            className="bg-orange-300 hover:bg-orange-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition shadow-sm"
                        >
                            + Create New Lecture
                        </Link>
                    </div>

                    {/* Lectures Table */}
                    {lectures.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-orange-200 shadow-sm">
                            <p className="text-slate-600 font-medium">No lectures found in the database.</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-orange-100/60 border-b border-orange-200 text-slate-800 text-xs uppercase tracking-wider">
                                            <th className="py-4 px-6 font-bold">Thumbnail & Title</th>
                                            <th className="py-4 px-6 font-bold">Category</th>
                                            <th className="py-4 px-6 font-bold">Price</th>
                                            <th className="py-4 px-6 font-bold text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-orange-100">
                                        {lectures.map((lecture) => (
                                            <tr key={lecture._id} className="hover:bg-orange-50/40 transition">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={lecture.thumbnailUrl}
                                                            alt={lecture.title}
                                                            className="w-14 h-10 object-cover rounded-lg border border-orange-200 shadow-sm"
                                                        />
                                                        <div>
                                                            <p className="font-bold text-slate-900 line-clamp-1">{lecture.title}</p>
                                                            <p className="text-xs text-slate-500 line-clamp-1">{lecture.description}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="bg-orange-100 text-slate-900 font-semibold px-2.5 py-1 rounded-md text-xs">
                                                        {lecture.category}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 font-bold text-slate-900">
                                                    ${lecture.price}
                                                </td>
                                                <td className="flex items-center gap-1 py-4 px-6 text-right space-x-2">
                                                    <button
                                                        onClick={() => handleEditClick(lecture)}
                                                        className="px-3 py-1.5 bg-orange-200 hover:bg-orange-300 text-slate-900 text-xs font-semibold rounded-lg transition cursor-pointer"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(lecture._id)}
                                                        className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-semibold rounded-lg transition cursor-pointer"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Edit Modal */}
                    {isEditModalOpen && editingLecture && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-orange-200">
                                <h2 className="text-xl font-bold text-slate-900 mb-4">Edit Lecture</h2>
                                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={editingLecture.title}
                                            onChange={(e) => setEditingLecture({ ...editingLecture, title: e.target.value })}
                                            required
                                            className="w-full px-3 py-2 border border-orange-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-300 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                                        <textarea
                                            value={editingLecture.description}
                                            onChange={(e) => setEditingLecture({ ...editingLecture, description: e.target.value })}
                                            rows={3}
                                            required
                                            className="w-full px-3 py-2 border border-orange-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-300 outline-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                                            <select
                                                value={editingLecture.category}
                                                onChange={(e) => setEditingLecture({ ...editingLecture, category: e.target.value })}
                                                className="w-full px-3 py-2 border border-orange-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-orange-300 outline-none"
                                            >
                                                {['Frontend', 'Backend', 'Fullstack', 'Database', 'Others'].map((cat) => (
                                                    <option key={cat} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1">Price ($)</label>
                                            <input
                                                type="number"
                                                value={editingLecture.price}
                                                onChange={(e) => setEditingLecture({ ...editingLecture, price: Number(e.target.value) })}
                                                required
                                                className="w-full px-3 py-2 border border-orange-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-300 outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-3 pt-4 border-t border-orange-100">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditModalOpen(false)}
                                            className="px-4 py-2 bg-gray-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-orange-300 hover:bg-orange-400 text-slate-950 rounded-lg text-sm font-bold transition shadow-sm"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AdminLecturesPage;