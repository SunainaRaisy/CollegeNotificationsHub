import { prisma } from '@/lib/prisma';
import styles from './page.module.css';
import { Bell, Zap, Calendar, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const recentAnnouncements = await prisma.announcement.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  });

  // Dummy announcements if DB is empty
  const announcements = recentAnnouncements.length > 0 ? recentAnnouncements : [
    {
      id: '1',
      title: 'Library Timings Updated',
      content: 'New library timings will be effective from May 15. Open 24/7 during exam season.',
      category: 'URGENT',
      createdAt: new Date(),
      author: { username: 'Admin' }
    },
    {
      id: '2',
      title: 'Tech Fiesta 2K25',
      content: 'Annual technical fest will be held from May 20 to May 22. Exciting prizes!',
      category: 'HACKATHON',
      createdAt: new Date(),
      author: { username: 'HOD_CSE' }
    },
    {
      id: '3',
      title: 'Exam Schedule Released',
      content: 'Check your semester exam schedule for May-June 2025 on the portal.',
      category: 'EXAM',
      createdAt: new Date(),
      author: { username: 'DEEN' }
    },
    {
      id: '4',
      title: 'Placement Drive: Google & Microsoft',
      content: 'Top tech companies are visiting the campus next month. Register with TNP cell.',
      category: 'CAREER',
      createdAt: new Date(),
      author: { username: 'TNP_CELL' }
    },
    {
      id: '5',
      title: 'Holiday Notice: State Formation Day',
      content: 'The college will remain closed tomorrow on account of State Formation Day.',
      category: 'GENERAL',
      createdAt: new Date(),
      author: { username: 'Principal' }
    },
    {
      id: '6',
      title: 'Inter-College Sports Meet',
      content: 'Selections for the basketball and cricket teams will be held this Saturday.',
      category: 'SPORTS',
      createdAt: new Date(),
      author: { username: 'Sports_Committee' }
    }
  ];

  return (
    <main className={styles.main}>
      <div className={styles.bgGlow}></div>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <div className={styles.badgeDot}></div>
            Real-time • Reliable • Always Updated
          </div>
          
          <h1 className={styles.title}>
            Stay informed.<br />
            <span>Stay ahead.</span>
          </h1>
          
          <p className={styles.description}>
            NotifyHub brings all campus announcements, events, and important updates to one place – accessible anytime, anywhere. Never miss what matters.
          </p>
          
          <div className={styles.ctaGroup}>
            <Link href="/announcements">
              <button className={styles.primaryBtn}>
                Explore Announcements <ArrowRight size={18} style={{ display: 'inline', marginLeft: '8px', verticalAlign: 'middle' }} />
              </button>
            </Link>
            <Link href="/contact">
              <button className={styles.secondaryBtn}>
                <MessageSquare size={18} />
                Ask a Question
              </button>
            </Link>
          </div>
        </div>
        
        <div className={styles.heroImage}>
          <Bell className={styles.hugeBell} />
        </div>
      </section>

      <section className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <div className={`${styles.featureIcon} ${styles.purple}`}>
            <Zap size={20} />
          </div>
          <div className={styles.featureContent}>
            <h3>Instant Updates</h3>
            <p>Get real-time announcements and urgent alerts instantly.</p>
          </div>
        </div>
        
        <div className={styles.featureCard}>
          <div className={`${styles.featureIcon} ${styles.blue}`}>
            <Calendar size={20} />
          </div>
          <div className={styles.featureContent}>
            <h3>Upcoming Events</h3>
            <p>Stay updated with all college events and activities.</p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <div className={`${styles.featureIcon} ${styles.green}`}>
            <MessageSquare size={20} />
          </div>
          <div className={styles.featureContent}>
            <h3>Ask & Connect</h3>
            <p>Reach the administration directly and get answers.</p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <div className={`${styles.featureIcon} ${styles.blue}`}>
            <ShieldCheck size={20} />
          </div>
          <div className={styles.featureContent}>
            <h3>Secure & Reliable</h3>
            <p>Your data and communication are safe with us.</p>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.sectionTitle}>
          What&apos;s Happening on Campus
        </div>
        <p className={styles.sectionSubtitle}>Stay in the loop with the latest</p>
        
        <div className={styles.announcementsGrid}>
          {announcements.map((announcement) => {
            // Dynamic styling based on category
            const isUrgent = announcement.category === 'URGENT';
            const isEvent = announcement.category === 'HACKATHON' || announcement.category === 'CLUB_EVENT';
            const isExam = announcement.category === 'EXAM';
            
            let cardClass = styles.announcementCard;
            let tagClass = styles.tagGeneral;
            
            if (isUrgent) {
              cardClass += ` ${styles.cardUrgent}`;
              tagClass = styles.tagUrgent;
            } else if (isEvent) {
              cardClass += ` ${styles.cardClubEvent}`;
              tagClass = styles.tagClubEvent;
            } else if (isExam) {
              cardClass += ` ${styles.cardExam}`;
              tagClass = styles.tagExam;
            }

            return (
              <div key={announcement.id} className={cardClass}>
                <div className={styles.cardHeader}>
                  <span className={`${styles.categoryTag} ${tagClass}`}>
                    {announcement.category}
                  </span>
                  <span className={styles.date}>
                    {new Date(announcement.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{announcement.title}</h3>
                <p className={styles.cardDesc}>{announcement.content}</p>
                <div className={styles.author}>Posted by: {announcement.author.username}</div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
