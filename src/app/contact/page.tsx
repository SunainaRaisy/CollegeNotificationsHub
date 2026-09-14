import { prisma } from '@/lib/prisma';
import styles from './page.module.css';
import ContactForm from './ContactForm';

export default async function ContactPage() {
  let answeredQueries: Awaited<ReturnType<typeof prisma.query.findMany>> = [];

  try {
    answeredQueries = await prisma.query.findMany({
      where: { isAnswered: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    answeredQueries = [];
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>We&apos;re here to help! Send us your questions, feedback, or suggestions.</p>
      </div>

      <div className={styles.content}>
        <ContactForm />

        <div className={styles.queriesSection}>
          <h2 className={styles.sectionTitle}>Recently Answered Queries</h2>
          
          <div className={styles.queryList}>
            {answeredQueries.length === 0 ? (
              <p className={styles.emptyState}>No queries have been answered yet.</p>
            ) : (
              answeredQueries.map((query: any) => (
                <div key={query.id} className={styles.queryCard}>
                  <div className={styles.queryHeader}>
                    <span className={styles.studentInfo}>{query.studentName} ({query.department})</span>
                    <span>
                      {new Date(query.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div className={styles.question}>
                    Q: {query.question}
                  </div>
                  
                  {query.answer && (
                    <div className={styles.answer}>
                      <div className={styles.answerLabel}>Admin Response</div>
                      <div className={styles.answerText}>{query.answer}</div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
