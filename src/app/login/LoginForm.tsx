'use client';

import { useState } from 'react';
import { User, Lock } from 'lucide-react';
import styles from './page.module.css';
import { login } from './actions';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError(null);
    
    const result = await login(formData);
    
    if (result && result.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.glow}></div>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Sign in to your administration account</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form action={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="username">Username</label>
            <div className={styles.inputWrapper}>
              <User className={styles.icon} size={20} />
              <input 
                className={styles.input} 
                type="text" 
                id="username" 
                name="username" 
                placeholder="e.g. Admin or HOD_CSE" 
                required 
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">Password</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.icon} size={20} />
              <input 
                className={styles.input} 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Enter your password" 
                required 
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
