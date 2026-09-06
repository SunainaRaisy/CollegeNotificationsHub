"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Reply, CheckCircle } from "lucide-react";
import "../admin.css";
import { getQueries, deleteQuery, answerQuery } from "../../actions";

export default function ManageQueries() {
  const [queries, setQueries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQueries();
  }, []);

  const loadQueries = async () => {
    const data = await getQueries();
    setQueries(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this query?")) {
      await deleteQuery(id);
      loadQueries();
    }
  };

  const handleAnswer = async (id: string) => {
    const answer = prompt("Enter your reply to the student:");
    if (answer) {
      await answerQuery(id, answer);
      loadQueries();
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
            <h1>Student Queries</h1>
            <p>Answer student questions or remove inappropriate queries.</p>
          </div>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {loading ? <p>Loading...</p> : queries.map((q) => (
            <div key={q.id} style={{ background: 'rgba(20, 22, 35, 0.6)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, marginRight: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{q.studentName} ({q.department}) asks:</h3>
                  {q.isAnswered && <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem', color: 'var(--neon-green)' }}><CheckCircle size={14} /> Answered</span>}
                </div>
                <p style={{ color: 'white', fontSize: '1rem', marginBottom: '1rem' }}>"{q.question}"</p>
                {q.isAnswered && (
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid var(--neon-purple)' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--neon-purple)', fontWeight: 'bold' }}>ADMIN REPLY:</span>
                    <p style={{ marginTop: '0.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{q.answer}</p>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                {!q.isAnswered && (
                  <button onClick={() => handleAnswer(q.id)} style={{ background: 'rgba(0, 240, 255, 0.1)', border: '1px solid var(--neon-blue)', color: 'var(--neon-blue)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Reply size={16} /> Reply
                  </button>
                )}
                <button onClick={() => handleDelete(q.id)} style={{ background: 'transparent', border: 'none', color: 'var(--neon-red)', cursor: 'pointer', padding: '0.5rem' }}><Trash2 size={20} /></button>
              </div>
            </div>
          ))}
          {!loading && queries.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No queries found in the database.</p>}
        </div>
      </div>
    </main>
  );
}
