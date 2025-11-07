"use client"
import React, { useState } from "react";
import axios from "../../../../lib/axios";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const create = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // backend expects create endpoint at POST /api/posts/createPost (multipart/form-data)
      const fd = new FormData();
      // the backend post model uses `content` as the body field
      fd.append('content', content);
      if (image) fd.append('image', image);

      await axios.post("/posts/createPost", fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      router.push("/posts");
    } catch (err) {
      console.error("Failed to create post", err);
      alert("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">New Post</h1>
        <form onSubmit={create} className="space-y-4">
          <div>
            <label className="block text-sm">Title</label>
            <input aria-label="title" placeholder="Post title" defaultValue={title} onChange={(e)=>setTitle(e.target.value)} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block text-sm">Content</label>
            <textarea aria-label="content" placeholder="Write your post content..." defaultValue={content} onChange={(e)=>setContent(e.target.value)} className="w-full border p-2 rounded h-32" />
          </div>

          <div>
            <label className="block text-sm">Image (optional)</label>
            <input aria-label="image" type="file" accept="image/*" onChange={(e)=> setImage(e.target.files ? e.target.files[0] : null)} className="w-full mt-2" />
          </div>

          <div className="flex items-center justify-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading? 'Creating...' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
