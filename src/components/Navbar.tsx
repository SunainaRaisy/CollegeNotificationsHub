'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Announcements', href: '/announcements' },
    { name: 'Contact', href: '/contact' },
    { name: 'Admin', href: '/admin' },
    { name: 'Staff', href: '/staff' },
  ];

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logoContainer}>
        <div className={styles.bellWrapper}>
          <Bell className={styles.bellIcon} size={24} />
        </div>
        <div className={styles.logoText}>
          Notify<span className={styles.logoHighlight}>Hub</span>
        </div>
      </Link>

      <ul className={styles.navLinks}>
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`${styles.navLink} ${
                pathname === link.href ? styles.activeLink : ''
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.campusLive}>
        <div className={styles.liveDot}></div>
        Campus Live
      </div>
    </nav>
  );
}
