"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, Send, CheckCircle } from "lucide-react";
import "../admin/admin.css"; // Reuse admin styles for consistency

import { addAnnouncement } from "../actions";

export default function StaffPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [posted, setPosted] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "staff89" && password === "vgnt") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAnnouncement({
      title: announcementTitle,
      content: announcementContent,
      category: "GENERAL",
      authorUsername: role === "HOD" ? `HOD_${department}` : role
    });
    setPosted(true);
    setTimeout(() => {
      setPosted(false);
      setAnnouncementTitle("");
      setAnnouncementContent("");
    }, 3000);
  };

  if (!isLoggedIn) {
    return (
      <main className="admin-page login-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div className="admin-glow admin-glow-one"></div>
        <div className="admin-container" style={{ maxWidth: '400px', background: 'rgba(20, 22, 35, 0.6)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Users size={40} style={{ color: 'var(--neon-blue)', marginBottom: '1rem' }} />
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Staff Login</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Sign in to access staff portal</p>
          </div>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
              />
            </div>
            <button type="submit" style={{ background: 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))', color: 'white', padding: '0.75rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}>
              Login
            </button>
          </form>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link href="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textDecoration: 'none' }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!role) {
    return (
      <main className="admin-page login-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div className="admin-glow admin-glow-two"></div>
        <div className="admin-container" style={{ maxWidth: '500px', background: 'rgba(20, 22, 35, 0.6)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Select Your Role</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Welcome, {username}. Please select your designation.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            {['HOD', 'DEEN', 'Training and Placements cell', 'Principal'].map((r) => (
              <button 
                key={r}
                onClick={() => setRole(r)}
                style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  color: 'white', 
                  padding: '1rem', 
                  borderRadius: '8px', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '1rem',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (role === 'HOD' && !department) {
    return (
      <main className="admin-page login-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div className="admin-glow admin-glow-one"></div>
        <div className="admin-container" style={{ maxWidth: '600px', background: 'rgba(20, 22, 35, 0.6)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Select Department</h1>
            <p style={{ color: 'var(--text-secondary)' }}>As a HOD, please select your department.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {['CSE', 'CSD', 'CSM', 'CSE(AIML)', 'IT', 'EEE', 'ECE', 'MECHANICAL', 'CIVIL', 'EIE', 'AIDS'].map((dept) => (
              <button 
                key={dept}
                onClick={() => setDepartment(dept)}
                style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  color: 'white', 
                  padding: '1rem', 
                  borderRadius: '8px', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '1rem',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-glow admin-glow-one"></div>
      <div className="admin-glow admin-glow-two"></div>

      <div className="admin-container">
        <Link href="/" className="admin-back">
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        <header className="admin-header">
          <div className="admin-icon" style={{ background: 'rgba(0, 240, 255, 0.15)', color: 'var(--neon-blue)' }}>
            <Users size={32} />
          </div>

          <div>
            <div className="admin-small">STAFF PORTAL</div>
            <h1>{role} Dashboard</h1>
            <p>Welcome, {username} {department ? `(${department})` : ''}. Post announcements to students.</p>
          </div>
        </header>

        <section style={{ background: 'rgba(20, 22, 35, 0.6)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Send size={24} color="var(--neon-purple)" />
            Post New Announcement
          </h2>
          
          {posted ? (
            <div style={{ background: 'rgba(0, 255, 136, 0.1)', border: '1px solid var(--neon-green)', padding: '2rem', borderRadius: '12px', textAlign: 'center', color: 'var(--neon-green)' }}>
              <CheckCircle size={48} style={{ margin: '0 auto 1rem' }} />
              <h3>Announcement Posted Successfully!</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Your announcement has been sent to the students.</p>
            </div>
          ) : (
            <form onSubmit={handlePostAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
