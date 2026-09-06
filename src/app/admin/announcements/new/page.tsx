"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";
import "../../admin.css";
import { addAnnouncement } from "../../../actions";

export default function NewAnnouncement() {
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [category, setCategory] = useState("GENERAL");
  const [posted, setPosted] = useState(false);

  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAnnouncement({ title: announcementTitle, content: announcementContent, category, authorUsername: "Admin" });
    setPosted(true);
    setTimeout(() => {
      setPosted(false);
      setAnnouncementTitle("");
      setAnnouncementContent("");
      setCategory("GENERAL");
    }, 3000);
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
            <h1>Create New Announcement</h1>
            <p>Publish updates instantly to the student portal.</p>
          </div>
        </header>

        <section style={{ background: 'rgba(20, 22, 35, 0.6)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
          {posted ? (
            <div style={{ background: 'rgba(0, 255, 136, 0.1)', border: '1px solid var(--neon-green)', padding: '2rem', borderRadius: '12px', textAlign: 'center', color: 'var(--neon-green)' }}>
              <CheckCircle size={48} style={{ margin: '0 auto 1rem' }} />
              <h3>Announcement Posted Successfully!</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Your announcement is now live on the homepage.</p>
              <button onClick={() => setPosted(false)} style={{ marginTop: '1rem', background: 'transparent', border: '1px solid var(--neon-green)', color: 'var(--neon-green)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Post Another</button>
            </div>
          ) : (
            <form onSubmit={handlePostAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '1rem' }}
                >
                  <option value="GENERAL">General</option>
                  <option value="URGENT">Urgent</option>
                  <option value="EXAM">Exam</option>
                  <option value="HACKATHON">Event / Hackathon</option>
                  <option value="SPORTS">Sports</option>
                  <option value="CAREER">Career</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Announcement Title</label>
                <input 
                  type="text" 
                  value={announcementTitle}
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                  placeholder="e.g. Exam Schedule Released"
                  required
                  style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '1rem' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Announcement Content</label>
                <textarea 
                  value={announcementContent}
                  onChange={(e) => setAnnouncementContent(e.target.value)}
                  placeholder="Write your message here..."
                  required
                  rows={5}
                  style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '1rem', resize: 'vertical' }}
                />
              </div>
              
              <button type="submit" style={{ background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))', color: 'white', padding: '1rem 2rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', alignSelf: 'flex-start', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Send size={18} />
                Publish Announcement
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
