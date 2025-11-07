"use client"
import React, { useEffect, useState } from "react";
import axios from "../../../lib/axios";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("/events");
        // backend returns { total, page, limit, events }
        setEvents(res.data?.events || []);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };
    const fetchMe = async () => {
      try {
        const r = await axios.get('/auth/me');
        setCurrentUser(r.data.user || r.data);
      } catch (e) { console.warn('me failed', e); }
    }
    fetchEvents();
    fetchMe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Events</h1>
          <a href="/events/new" className="text-sm text-blue-600">New Event</a>
        </div>

        {loading ? (
          <p>Loading events…</p>
        ) : events.length === 0 ? (
          <p>No events yet.</p>
        ) : (
          <ul className="space-y-4">
            {events.map((e) => (
              <li key={e._id} className="p-4 bg-white rounded shadow hover:shadow-md transition transform hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">📅</div>
                  <div className="flex-1">
                    <div className="font-semibold">{e.title || "Untitled"}</div>
                    <div className="text-sm text-gray-600">{e.description || ""}</div>
                    <div className="text-xs text-gray-500">{e.date ? new Date(e.date).toLocaleString() : ''}</div>
                  </div>
                  <div className="flex items-center">
                    <AttendeeButton eventItem={e} currentUser={currentUser} onUpdate={(updatedEvent:any)=>{
                      setEvents(prev => prev.map(ev => ev._id === updatedEvent._id ? updatedEvent : ev));
                    }} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function AttendeeButton({ eventItem, currentUser, onUpdate }: { eventItem: any, currentUser: any, onUpdate: (ev:any)=>void }){
  const isAttending = () => {
    try{
      const uid = currentUser?._id || currentUser?.id;
      if(!uid) return false;
      const arr = eventItem?.attendees || [];
      return arr.some((a:any) => {
        if (!a) return false;
        const aid = a._id || a;
        return String(aid) === String(uid);
      });
    }catch(e){
      return false;
    }
  }

  const handleClick = async () => {
    try{
      const res = await axios.post(`/events/${eventItem._id}/rsvp`);
      const updated = res.data.event || res.data;
      onUpdate(updated);
    }catch(err){
      console.error('RSVP failed', err);
      alert('RSVP failed');
    }
  }

  const attending = isAttending();

  return (
    <button onClick={handleClick} className={`px-3 py-1 rounded ${attending ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>
      {attending ? 'Going' : 'RSVP'} ({(eventItem.attendees && eventItem.attendees.length) || 0})
    </button>
  )
}
