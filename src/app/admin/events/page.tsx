"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Edit } from "lucide-react";
import "../admin.css";
import { getEvents, deleteEvent, addEvent, editEvent } from "../../actions";

export default function ManageEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const data = await getEvents();
    setEvents(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(id);
      loadEvents();
    }
  };

  const handleEdit = async (evt: any) => {
    const newTitle = prompt("Edit Title:", evt.title);
    if (newTitle === null) return;
    const newLocation = prompt("Edit Location:", evt.location);
    if (newLocation === null) return;
    const newDate = prompt("Edit Date (YYYY-MM-DD):", new Date(evt.date).toISOString().split('T')[0]);
    if (newDate === null) return;
    
    if (newTitle && newDate) {
      await editEvent(evt.id, { title: newTitle, date: newDate, location: newLocation || "" });
      loadEvents();
    }
  };

  const handleAdd = async () => {
    const title = prompt("Event Title:");
    if (!title) return;
    const desc = prompt("Description:");
    const location = prompt("Location:");
    const date = prompt("Date (YYYY-MM-DD):", new Date().toISOString().split('T')[0]);
    if (title && date) {
      await addEvent({ title, description: desc || "", category: "GENERAL", date, location: location || "" });
      loadEvents();
    }
  };

  return (
    <main className="admin-page">
      <div className="admin-glow admin-glow-two"></div>
      <div className="admin-container">
        <Link href="/admin" className="admin-back">
          <ArrowLeft size={17} /> Back to Dashboard
        </Link>
        <header className="admin-header" style={{ marginBottom: '2rem' }}>
          <div>
            <h1>Manage Events</h1>
            <p>View, edit, or delete upcoming college events.</p>
          </div>
          <button onClick={handleAdd} className="quick-button" style={{ marginLeft: 'auto' }}>
            New Event
          </button>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {loading ? <p>Loading...</p> : events.map((evt) => (
            <div key={evt.id} style={{ background: 'rgba(20, 22, 35, 0.6)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem' }}>{evt.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{new Date(evt.date).toLocaleDateString()} • {evt.location}</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => handleEdit(evt)} style={{ background: 'transparent', border: 'none', color: 'var(--neon-blue)', cursor: 'pointer' }}><Edit size={20} /></button>
                <button onClick={() => handleDelete(evt.id)} style={{ background: 'transparent', border: 'none', color: 'var(--neon-red)', cursor: 'pointer' }}><Trash2 size={20} /></button>
              </div>
            </div>
          ))}
          {!loading && events.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No events found in the database.</p>}
        </div>
      </div>
    </main>
  );
}
