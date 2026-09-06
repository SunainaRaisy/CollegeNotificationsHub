'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import styles from './page.module.css';
import { submitQuery } from './actions';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    setStatus('submitting');
    const result = await submitQuery(formData);
    
    if (result.error) {
      setStatus('error');
      setMessage(result.error);
    } else {
      setStatus('success');
      setMessage('Your query has been submitted successfully! The administration will respond soon.');
      // Reset form
      const form = document.getElementById('contactForm') as HTMLFormElement;
      if (form) form.reset();
    }
  }

  return (
    <div className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Send us a Message</h2>
      
      {status === 'success' && (
        <div style={{ padding: '1rem', background: 'rgba(0, 255, 136, 0.1)', color: 'var(--neon-green)', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid var(--neon-green)' }}>
          {message}
        </div>
      )}

      {status === 'error' && (
        <div style={{ padding: '1rem', background: 'rgba(255, 51, 102, 0.1)', color: 'var(--neon-red)', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid var(--neon-red)' }}>
          {message}
        </div>
      )}

      <form id="contactForm" action={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="studentName">Your Name</label>
          <input className={styles.input} type="text" id="studentName" name="studentName" placeholder="Enter your full name" required />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="rollNo">Roll Number</label>
          <input className={styles.input} type="text" id="rollNo" name="rollNo" placeholder="Enter your roll number" required />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="department">Department</label>
          <select className={styles.select} id="department" name="department" required defaultValue="">
            <option value="" disabled>Select your department</option>
            <option value="CSE">CSE</option>
            <option value="CSM">CSM</option>
            <option value="CSD">CSD</option>
            <option value="AI-ML">AI-ML</option>
            <option value="IT">IT</option>
            <option value="CIVIL">CIVIL</option>
            <option value="MECHANICAL">MECHANICAL</option>
            <option value="EEE">EEE</option>
            <option value="ECE">ECE</option>
            <option value="EIE">EIE</option>
            <option value="GENERAL">General/Other</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="question">Your Query / Question</label>
          <textarea className={styles.textarea} id="question" name="question" placeholder="Type your query or question here..." required></textarea>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={status === 'submitting'}>
          <Send size={18} />
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
