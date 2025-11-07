"use client"
import React, { useEffect, useState } from 'react';
import axios from '../../../lib/axios';

export default function ProfilePage(){
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(()=>{
    const fetchMe = async ()=>{
      try{
        const res = await axios.get('/auth/me');
        const u = res.data.user || res.data;
        setUser(u);
        setName(u?.name || '');
      }catch(err){
        console.error('Failed to fetch user', err);
      }finally{ setLoading(false); }
    }
    fetchMe();
  },[]);

  const uploadProfile = async ()=>{
    if(!file) return alert('Select an image first');
    setSaving(true);
    const fd = new FormData();
    fd.append('image', file);
    try{
      const res = await axios.post('/upload/profile', fd, { headers: { 'Content-Type': 'multipart/form-data' }});
      const imageUrl = res.data.imageUrl || res.data.image;
      // update UI
      setUser((prev:any)=> prev ? { ...prev, profileImage: imageUrl } : prev);
    }catch(err){
      console.error('Upload failed', err);
      alert('Upload failed');
    }finally{ setSaving(false); }
  }

  const saveName = async ()=>{
    if(!user) return;
    setSaving(true);
    try{
      // Try updating via PUT /users/:id if available
      const res = await axios.put(`/users/${user._id}`, { name });
      // If successful, refresh user
      const updated = res.data.user || res.data;
      setUser(updated);
      alert('Profile updated');
    }catch(err:any){
      console.warn('PUT /users/:id failed or unsupported', err?.response?.status);
      // fallback: try calling /auth/me update (if implemented)
      try{
        const r2 = await axios.put('/auth/me', { name });
        const updated = r2.data.user || r2.data;
        setUser(updated);
        alert('Profile updated');
      }catch(e){
        console.error('Profile name update not supported by server', e);
        alert('Name update not supported by server (backend endpoint missing)');
      }
    }finally{ setSaving(false); }
  }

  if(loading) return <div className="p-4">Loading…</div>;
  if(!user) return <div className="p-4">No user data</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow" suppressHydrationWarning>
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-32 h-32 bg-gray-100 rounded overflow-hidden flex items-center justify-center flex-shrink-0">
            {user.profileImage ? (
              <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-sm text-gray-600">No image</div>
            )}
          </div>

          <div className="flex-1">
            <div className="mb-3">
              <label className="block text-sm mb-1">Name</label>
              <input defaultValue={name} onChange={(e)=>setName(e.target.value)} className="w-full border p-2 rounded" />
            </div>

            <div className="mb-3">
              <label className="block text-sm mb-1">Email</label>
              <input value={user.email || ''} disabled className="w-full border p-2 rounded bg-gray-50" />
            </div>

            <div className="flex gap-3">
              <button onClick={saveName} className="px-4 py-2 bg-blue-600 text-white rounded" disabled={saving}>Save name</button>
              <label className="inline-block">
                <input type="file" accept="image/*" onChange={(e)=> setFile(e.target.files?.[0] || null)} className="sr-only" />
                <span className="px-4 py-2 bg-gray-100 border rounded cursor-pointer text-sm">Choose image</span>
              </label>
              <button onClick={uploadProfile} className="px-4 py-2 bg-green-600 text-white rounded" disabled={saving}>Upload</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
