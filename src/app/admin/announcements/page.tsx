"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Edit } from "lucide-react";
import "../admin.css";
import { getAnnouncements, deleteAnnouncement, editAnnouncement } from "../../actions";

export default function ManageAnnouncements() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    const data = await getAnnouncements();
    setAnnouncements(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      await deleteAnnouncement(id);
      loadAnnouncements();
    }
  };

  const handleEdit = async (ann: any) => {
    const newTitle = prompt("Edit Title:", ann.title);
    if (newTitle === null) return;
    const newContent = prompt("Edit Content:", ann.content);
    if (newContent === null) return;
    
    if (newTitle && newContent) {
      await editAnnouncement(ann.id, { title: newTitle, content: newContent });
      loadAnnouncements();
    }
  };

  return (
    <main className="admin-page">
      <div className="admin-glow admin-glow-one"></div>
      <div className="admin-container">
        <Link href="/admin" className="admin-back">
          <ArrowLeft size={17} /> Back to Dashboard
        </Link>
        <header className="admin-header" style={{ marginBottom: '2rem' }}>
          <div>
            <h1>Manage Announcements</h1>
            <p>View, edit, or delete existing announcements.</p>
          </div>
          <Link href="/admin/announcements/new" className="quick-button" style={{ marginLeft: 'auto' }}>
            New Announcement
          </Link>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {loading ? <p>Loading...</p> : announcements.map((ann) => (
            <div key={ann.id} style={{ background: 'rgba(20, 22, 35, 0.6)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.8rem', background: 'rgba(0, 240, 255, 0.15)', color: 'var(--neon-blue)', padding: '0.2rem 0.5rem', borderRadius: '8px', marginRight: '1rem' }}>{ann.category}</span>
                <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>{ann.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{ann.content}</p>
                <p style={{ color: 'var(--neon-purple)', fontSize: '0.8rem', marginTop: '0.5rem' }}>By: {ann.author?.username}</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => handleEdit(ann)} style={{ background: 'transparent', border: 'none', color: 'var(--neon-blue)', cursor: 'pointer' }}><Edit size={20} /></button>
                <button onClick={() => handleDelete(ann.id)} style={{ background: 'transparent', border: 'none', color: 'var(--neon-red)', cursor: 'pointer' }}><Trash2 size={20} /></button>
              </div>
            </div>
          ))}
          {!loading && announcements.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No announcements found in the database.</p>}
        </div>
      </div>
    </main>
  );
}
