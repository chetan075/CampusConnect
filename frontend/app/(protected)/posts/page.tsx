"use client"
import React, { useEffect, useState } from "react";
import axios from "../../../lib/axios";

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [openPostId, setOpenPostId] = useState<string | null>(null); // for comments toggle
  const [viewerPost, setViewerPost] = useState<any>(null); // image viewer
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/posts");
      setPosts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMe = async () => {
    try {
      const r = await axios.get('/auth/me');
      setCurrentUser(r.data.user || r.data);
    } catch (e) {
      console.warn('me fetch failed', e);
    }
  }

  useEffect(() => {
    fetchMe();
    fetchPosts();
  }, []);

  const toggleLike = async (postId: string) => {
    // optimistic: toggle locally, then call server; rollback on error
    setPosts(prev => prev.map(p => {
      if (p._id !== postId) return p;
      const userId = currentUser?._id || currentUser?.id;
      const likes = Array.isArray(p.likes) ? [...p.likes] : [];
      const has = userId && likes.find((id:any)=> id.toString() === userId.toString());
      let newLikes;
      if (has) newLikes = likes.filter((id:any)=> id.toString() !== userId.toString());
      else newLikes = [...likes, userId];
      return { ...p, likes: newLikes };
    }));

    try {
      await axios.post(`/posts/${postId}/like`);
    } catch (err) {
      console.error('Like failed, rolling back', err);
      // rollback by refetching posts (simple)
      fetchPosts();
    }
  };

  const submitComment = async (postId: string, text: string, clear: () => void) => {
    if (!text || !text.trim()) return;
    // optimistic: add a temp comment locally
    const temp = { user: currentUser, text, timestamp: new Date().toISOString(), _temp: true };
    setPosts(prev => prev.map(p => p._id === postId ? { ...p, comments: [...(p.comments||[]), temp] } : p));
    clear();
    try {
      const res = await axios.post(`/posts/${postId}/comment`, { text });
      setPosts(prev => prev.map(p => p._id === postId ? { ...p, comments: res.data } : p));
      // reset last-seen so the user won't see unread after commenting
      try { localStorage.setItem(`post_last_seen_${postId}`, new Date().toISOString()); } catch(e){}
    } catch (err) {
      console.error('Comment failed', err);
      // rollback: refetch posts
      fetchPosts();
    }
  };

  // open comments and mark as seen
  const handleToggleComments = (postId: string) => {
    if (openPostId === postId) {
      setOpenPostId(null);
    } else {
      setOpenPostId(postId);
      try { localStorage.setItem(`post_last_seen_${postId}`, new Date().toISOString()); } catch(e){}
    }
  }

  const startEdit = (post:any) => {
    setEditingPostId(post._id);
    setEditingContent(post.content || '');
  }

  const saveEdit = async (postId:string) => {
    try {
      const res = await axios.put(`/posts/${postId}`, { content: editingContent });
      setPosts(prev => prev.map(p => p._id === postId ? res.data.post : p));
      setEditingPostId(null);
      setEditingContent('');
    } catch (err) {
      console.error('Update failed', err);
      alert('Update failed');
    }
  }

  const deletePost = async (postId:string) => {
    if (!confirm('Delete this post?')) return;
    try {
      await axios.delete(`/posts/${postId}`);
      setPosts(prev => prev.filter(p => p._id !== postId));
    } catch (err) {
      console.error('Delete failed', err);
      alert('Delete failed');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Posts</h1>
          <a href="/posts/new" className="text-sm text-blue-600">New Post</a>
        </div>

      {loading ? (
        <p>Loading posts…</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((p) => (
            <li key={p._id} className="p-4 bg-white rounded shadow hover:shadow-md transition transform hover:-translate-y-1">
              <div className="flex gap-4">
                <div className="w-72">
                  {p.image ? (
                    <div className="relative">
                      <img src={p.image} alt="post" className="w-full h-36 object-cover rounded" />
                      <button onClick={() => setViewerPost(p)} className="absolute right-2 top-2 bg-white/80 px-2 py-1 rounded shadow">View</button>
                    </div>
                  ) : (
                    <div className="w-full h-36 bg-gray-100 rounded flex items-center justify-center">No image</div>
                  )}
                </div>

                <div className="flex-1 flex flex-col">
                  <div>
                    <div className="font-semibold mb-1">{p.content || "Untitled"}</div>
                    <div className="text-sm text-gray-600 mb-3">by {p.author?.name || p.author?.email || 'Unknown'}</div>
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <button onClick={() => toggleLike(p._id)} className={`px-3 py-1 rounded ${ (currentUser && p.likes && p.likes.find((id:any)=> id.toString() === (currentUser._id||currentUser.id))) ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>
                      Like ({(p.likes && p.likes.length) || 0})
                    </button>
                    <button onClick={() => handleToggleComments(p._id)} className="px-3 py-1 border rounded">Comments ({(p.comments && p.comments.length) || 0})</button>

                    {/* author controls */}
                    {currentUser && p.author && (currentUser._id === p.author._id || currentUser.id === p.author._id) && (
                      <div className="ml-auto flex items-center gap-2">
                        <button onClick={()=>startEdit(p)} className="px-2 py-1 border rounded text-sm">Edit</button>
                        <button onClick={()=>deletePost(p._id)} className="px-2 py-1 border rounded text-sm text-red-600">Delete</button>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto text-sm text-gray-700">
                    {p.comments && p.comments.length > 0 ? (
                      <div className="flex items-center gap-2">
                        <div className="truncate">Last: {p.comments[p.comments.length-1].text}</div>
                        {(() => {
                          try {
                            const lastSeen = localStorage.getItem(`post_last_seen_${p._id}`);
                            const lastSeenTime = lastSeen ? new Date(lastSeen).getTime() : 0;
                            const unread = (p.comments || []).filter((c:any)=> new Date(c.timestamp || c.createdAt || Date.now()).getTime() > lastSeenTime).length;
                            if (unread > 0) return <div className="text-xs bg-red-600 text-white px-2 py-0.5 rounded">{unread}</div>
                          } catch(e) {}
                          return null;
                        })()}
                      </div>
                    ) : (
                      <div className="text-gray-500">No comments yet</div>
                    )}
                  </div>

                  {openPostId === p._id && (
                    <div className="mt-3">
                      {editingPostId === p._id ? (
                        <div className="mb-2">
                          <textarea title="Edit post content" value={editingContent} onChange={(e)=>setEditingContent(e.target.value)} className="w-full border p-2 rounded" />
                          <div className="flex gap-2 mt-2">
                            <button onClick={()=>saveEdit(p._id)} className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
                            <button onClick={()=>{setEditingPostId(null); setEditingContent('')}} className="px-3 py-1 border rounded">Cancel</button>
                          </div>
                        </div>
                      ) : null}
                      <CommentsBlock post={p} onSubmit={(text, clear) => submitComment(p._id, text, clear)} />
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* image viewer drawer */}
      {viewerPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-white rounded shadow p-4 overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold">{viewerPost.author?.name || 'Post'}</div>
              <button onClick={() => setViewerPost(null)} className="px-3 py-1 border rounded">Close</button>
            </div>
            <img src={viewerPost.image} alt="viewer" className="w-full object-contain" />
            <div className="mt-4">{viewerPost.content}</div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

function CommentsBlock({ post, onSubmit }: { post: any, onSubmit: (text: string, clear: ()=>void)=>void }){
  const [text, setText] = useState('');
  const clear = () => setText('');
  return (
    <div>
      <ul className="space-y-2 mb-2 max-h-48 overflow-y-auto">
        {(post.comments || []).map((c:any, idx:number) => (
          <li key={idx} className="border p-2 rounded">
            <div className="text-sm">{c.text}</div>
            <div className="text-xs text-gray-500">by {c.user?.name || c.user || 'Unknown'}</div>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Write a comment" className="flex-1 border p-2 rounded" />
        <button onClick={() => onSubmit(text, clear)} className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </div>
    </div>
  )
}
