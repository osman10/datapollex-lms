'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import type { ApiResponse, Lecture } from '@/app/lib/lecture-types';

type LectureDetailPageProps = {
    params: Promise<{ id: string }>;
};

function getYouTubeEmbedUrl(videoUrl: string) {
    try {
        const url = new URL(videoUrl);
        const hostname = url.hostname.replace(/^www\./, '').toLowerCase();
        let videoId: string | null | undefined;

        if (hostname === 'youtu.be') {
            videoId = url.pathname.split('/').filter(Boolean)[0];
        } else if (['youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(hostname)) {
            if (url.pathname.startsWith('/embed/')) {
                videoId = url.pathname.split('/')[2];
            } else {
                videoId = url.searchParams.get('v')
                    || url.pathname.match(/^\/(?:shorts|live)\/([^/]+)/)?.[1];
            }
        }

        return videoId
            ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`
            : videoUrl;
    } catch {
        return videoUrl;
    }
}

const LectureDetailPage = ({ params }: LectureDetailPageProps) => {
    const { id } = use(params);

    const [lecture, setLecture] = useState<Lecture | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000';

        fetch(`${serverUrl.replace(/\/+$/, '')}/api/lectures/${encodeURIComponent(id)}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch lecture details');
                return res.json();
            })
            .then((data: ApiResponse<Lecture>) => {
                if (data.success) {
                    setLecture(data.data);
                } else {
                    setError('Lecture not found');
                }
                setLoading(false);
            })
            .catch((err: unknown) => {
                setError(err instanceof Error ? err.message : 'Failed to fetch lecture details');
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-orange-50">
                <p className="text-lg font-semibold text-slate-700 animate-pulse">Loading lecture...</p>
            </div>
        );
    }

    if (error || !lecture) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 gap-4">
                <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-center shadow-lg max-w-md">
                    <p className="text-red-600 font-semibold text-lg mb-1">Error Loading Lecture</p>
                    <p className="text-sm text-slate-600">{error || 'Lecture not found.'}</p>
                </div>
                <Link href="/courses" className="px-4 py-2 bg-orange-300 text-slate-950 font-semibold rounded-lg shadow hover:bg-orange-400 transition">
                    ← Back to Catalog
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-orange-50/40 py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                {/* Back Button */}
                <Link href="/courses" className="inline-flex items-center text-sm font-semibold text-slate-700 hover:text-slate-950 mb-6 transition">
                    ← Back to all lectures
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100 p-6 md:p-8">
                    {/* Category & Price Header */}
                    <div className="flex justify-between items-center mb-4">
                        <span className="bg-orange-100 text-slate-900 font-bold px-3 py-1 rounded-md text-xs uppercase tracking-wider">
                            {lecture.category}
                        </span>
                        <span className="bg-orange-300 text-slate-950 font-extrabold px-4 py-1.5 rounded-full text-lg shadow-sm">
                            ${lecture.price}
                        </span>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                        {lecture.title}
                    </h1>

                    {/* YouTube Video Embed Player */}
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md bg-black mb-6">
                        <iframe
                            src={getYouTubeEmbedUrl(lecture.videoUrl)}
                            title={lecture.title}
                            className="absolute top-0 left-0 w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {/* Description */}
                    <div className="border-t border-orange-100 pt-6">
                        <h2 className="text-lg font-bold text-slate-800 mb-2">Description</h2>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                            {lecture.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LectureDetailPage;