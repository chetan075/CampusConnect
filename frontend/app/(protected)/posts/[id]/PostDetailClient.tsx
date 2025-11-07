"use client"
import React, { useEffect, useState } from 'react';
import axios from '../../../../lib/axios';

export default function PostDetailClient({ postId }: { postId: string }){
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let cancelled = false;
    const fetch = async () => {
      try {
        const res = await axios.get('/posts');
        if (cancelled) return;
        const found = (res.data || []).find((p:any) => String(p._id) === String(postId));
        setPost(found || null);
      } catch (err) {
        console.error('Failed to fetch post', err);
      } finally { if (!cancelled) setLoading(false); }
    };
    fetch();
    return () => { cancelled = true };
  }, [postId]);

  const toggleLike = async () => {
    if (!post) return;
    try {
      const res = await axios.post(`/posts/${post._id}/like`);
      // res returns likes: number
      setPost({...post, likesCount: res.data.likes});
    } catch (err) { console.error('Like failed', err); }
  }

  const submitComment = async () => {
    if (!comment.trim()) return;
    try {
      const res = await axios.post(`/posts/${post._id}/comment`, { text: comment });
      // res returns comments array
      setPost({...post, comments: res.data});
      setComment('');
    } catch (err) { console.error('Comment failed', err); }
  }

  if (loading) return <div>Loading…</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div className="p-4 max-w-2xl">
      <div className="mb-3">
        <div className="text-lg font-semibold">{post.content}</div>
        {post.image && <img src={post.image} alt="post" className="mt-2 max-w-full rounded" />}
        <div className="text-xs text-gray-500">by {post.author?.name || post.author?.email}</div>
      </div>

      <div className="mb-3">
        <button onClick={toggleLike} className="px-3 py-1 bg-blue-600 text-white rounded">
          Like ({post.likesCount != null ? post.likesCount : (post.likes ? post.likes.length : 0)})
        </button>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Comments</h3>
        <ul className="space-y-2 mt-2">
          {(post.comments || []).map((c, i) => (
            <li key={i} className="border p-2 rounded">
              <div className="text-sm">{c.text}</div>
              <div className="text-xs text-gray-500">by {c.user}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2">
        <input value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Write a comment" className="flex-1 border p-2 rounded" />
        <button onClick={submitComment} className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </div>
    </div>
  )
}
