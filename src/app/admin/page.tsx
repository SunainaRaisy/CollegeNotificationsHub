"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Megaphone,
  CalendarDays,
  Users,
  MessageCircle,
  Plus,
  Lock,
} from "lucide-react";
import "./admin.css";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin06" && password === "060407") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="admin-page login-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div className="admin-glow admin-glow-one"></div>
        <div className="admin-container" style={{ maxWidth: '400px', background: 'rgba(20, 22, 35, 0.6)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Lock size={40} style={{ color: 'var(--neon-purple)', marginBottom: '1rem' }} />
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Admin Login</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Sign in to access dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
              />
            </div>
            {error && <div style={{ color: 'var(--neon-red)', fontSize: '0.9rem' }}>{error}</div>}
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
          <div className="admin-icon">
            <ShieldCheck size={32} />
          </div>

          <div>
            <div className="admin-small">NOTIFYHUB</div>
            <h1>Admin Dashboard</h1>
            <p>Manage announcements, events, staff and student queries.</p>
          </div>
        </header>

        <section className="admin-grid">
          <Link href="/admin/announcements" className="admin-card">
            <div className="admin-card-icon">
              <Megaphone size={26} />
            </div>
            <h2>Announcements</h2>
            <p>Create, edit and delete college announcements.</p>
            <span className="admin-card-action">Manage →</span>
          </Link>

          <Link href="/admin/events" className="admin-card">
            <div className="admin-card-icon">
              <CalendarDays size={26} />
            </div>
            <h2>Events</h2>
            <p>Add and manage upcoming college events.</p>
            <span className="admin-card-action">Manage →</span>
          </Link>

          <Link href="/admin/staff" className="admin-card">
            <div className="admin-card-icon">
              <Users size={26} />
            </div>
            <h2>Staff</h2>
            <p>Add and manage faculty and staff details.</p>
            <span className="admin-card-action">Manage →</span>
          </Link>

          <Link href="/admin/queries" className="admin-card">
            <div className="admin-card-icon">
              <MessageCircle size={26} />
            </div>
            <h2>Student Queries</h2>
            <p>View student questions and send replies.</p>
            <span className="admin-card-action">View Queries →</span>
          </Link>
        </section>

        <section className="admin-quick">
          <div>
            <span className="quick-label">QUICK ACTION</span>
            <h2>Publish a new announcement</h2>
            <p>Quickly notify students about important updates.</p>
          </div>

          <Link href="/admin/announcements/new" className="quick-button">
            <Plus size={18} />
            New Announcement
          </Link>
        </section>
      </div>
    </main>
  );
}
