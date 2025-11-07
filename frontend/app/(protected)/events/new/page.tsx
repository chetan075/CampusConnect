"use client"
import React, { useState } from "react";
import axios from "../../../../lib/axios";
import { useRouter } from "next/navigation";

export default function NewEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const create = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/events", { title, description, date, location });
      const created = res.data?.event || res.data;

      // if a poster file was selected, upload it to the upload/event/:id endpoint
      if (posterFile && created && created._id) {
        const fd = new FormData();
        fd.append('image', posterFile);
        try {
          await axios.post(`/upload/event/${created._id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        } catch (uerr) {
          console.warn('Poster upload failed', uerr);
          // not fatal — event was created
        }
      }

      router.push("/events");
    } catch (err) {
      console.error("Failed to create event", err);
      alert("Error creating event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">New Event</h1>
        <form onSubmit={create} className="space-y-4">
          <div>
            <label className="block text-sm">Title</label>
            <input aria-label="title" placeholder="Event title" defaultValue={title} onChange={(e)=>setTitle(e.target.value)} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block text-sm">Description</label>
            <textarea aria-label="description" placeholder="Event description" defaultValue={description} onChange={(e)=>setDescription(e.target.value)} className="w-full border p-2 rounded h-28" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm">Date & time</label>
              <input aria-label="date" placeholder="YYYY-MM-DDTHH:MM" defaultValue={date} onChange={(e)=>setDate(e.target.value)} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm">Location</label>
              <input aria-label="location" placeholder="Event location" defaultValue={location} onChange={(e)=>setLocation(e.target.value)} className="w-full border p-2 rounded" />
            </div>
          </div>

          <div>
            <label className="block text-sm">Event Poster (optional)</label>
            <input aria-label="poster" type="file" accept="image/*" onChange={(e)=> setPosterFile(e.target.files?.[0] || null)} className="w-full mt-2" />
          </div>

          <div className="flex items-center justify-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading? 'Creating...' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
