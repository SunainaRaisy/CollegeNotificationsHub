import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Bell, ArrowLeft, Megaphone } from "lucide-react";
import "./announcements.css";

export default async function AnnouncementsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;

  const selectedCategory = (
    params.category || "ALL"
  ).toUpperCase();

  const announcements = await prisma.announcement.findMany({
    where:
      selectedCategory === "ALL"
        ? undefined
        : {
            category: selectedCategory,
          },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      author: true,
    },
  });

  let formattedAnnouncements = announcements.map(
    (announcement) => ({
      id: announcement.id,
      title: announcement.title,
      content: announcement.content,
      category: announcement.category,
      createdAt: announcement.createdAt.toISOString(),
      author: {
        username: announcement.author.username,
      },
    })
  );

  if (formattedAnnouncements.length === 0) {
    formattedAnnouncements = [
      {
        id: '1',
        title: 'Library Timings Updated',
        content: 'New library timings will be effective from May 15. Open 24/7 during exam season.',
        category: 'URGENT',
        createdAt: new Date().toISOString(),
        author: { username: 'Admin' }
      },
      {
        id: '2',
        title: 'Tech Fiesta 2K25',
        content: 'Annual technical fest will be held from May 20 to May 22. Exciting prizes!',
        category: 'HACKATHON',
        createdAt: new Date().toISOString(),
        author: { username: 'HOD_CSE' }
      },
      {
        id: '3',
        title: 'Exam Schedule Released',
        content: 'Check your semester exam schedule for May-June 2025 on the portal.',
        category: 'EXAM',
        createdAt: new Date().toISOString(),
        author: { username: 'DEEN' }
      },
      {
        id: '4',
        title: 'Placement Drive: Google & Microsoft',
        content: 'Top tech companies are visiting the campus next month. Register with TNP cell.',
        category: 'CAREER',
        createdAt: new Date().toISOString(),
        author: { username: 'TNP_CELL' }
      },
      {
        id: '5',
        title: 'Holiday Notice: State Formation Day',
        content: 'The college will remain closed tomorrow on account of State Formation Day.',
        category: 'GENERAL',
        createdAt: new Date().toISOString(),
        author: { username: 'Principal' }
      },
      {
        id: '6',
        title: 'Inter-College Sports Meet',
        content: 'Selections for the basketball and cricket teams will be held this Saturday.',
        category: 'SPORTS',
        createdAt: new Date().toISOString(),
        author: { username: 'Sports_Committee' }
      }
    ].filter(a => selectedCategory === 'ALL' ? true : a.category === selectedCategory);
  }

  return (
    <main className="announcements-page">

      <div className="announcement-glow glow-one"></div>
      <div className="announcement-glow glow-two"></div>

      <div className="announcement-container">

        {/* BACK BUTTON */}

        <Link
          href="/"
          className="back-button"
        >
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        {/* HEADER */}

        <header className="announcement-header">

          <div className="bell-box">
            <Bell size={30} />
          </div>

          <div>
            <div className="notify-small">
              NOTIFYHUB
            </div>

            <h1>
              Announcements
            </h1>
          </div>

        </header>

        <p className="announcement-subtitle">
          Stay updated with important college announcements,
          examinations, events, hackathons and campus updates.
        </p>

        {/* CATEGORY FILTERS */}

        <div className="announcement-filter-wrapper">

          <div className="announcement-filters">

            {/* ALL */}

            <Link
              href="/announcements?category=ALL"
              className={`filter-button ${
                selectedCategory === "ALL"
                  ? "active"
                  : ""
              }`}
            >
              ALL
            </Link>

            {/* URGENT */}

            <Link
              href="/announcements?category=URGENT"
              className={`filter-button urgent-filter ${
                selectedCategory === "URGENT"
                  ? "active"
                  : ""
              }`}
            >
              🔴 URGENT
            </Link>

            {/* EXAMS */}

            <Link
              href="/announcements?category=EXAMS"
              className={`filter-button ${
                selectedCategory === "EXAMS"
                  ? "active"
                  : ""
              }`}
            >
              EXAMS
            </Link>

            {/* EVENTS */}

            <Link
              href="/announcements?category=EVENTS"
              className={`filter-button ${
                selectedCategory === "EVENTS"
                  ? "active"
                  : ""
              }`}
            >
              EVENTS
            </Link>

          </div>

          {/* ANNOUNCEMENTS */}

          {formattedAnnouncements.length === 0 ? (

            <div className="empty-announcements">

              <Megaphone size={40} />

              <h2>
                No{" "}
                {selectedCategory === "ALL"
                  ? ""
                  : selectedCategory.toLowerCase() + " "}
                announcements yet
              </h2>

              <p>
                New announcements will appear here
                when they are published.
              </p>

            </div>

          ) : (

            <div className="announcement-list">

              {formattedAnnouncements.map(
                (announcement) => {

                  const category =
                    announcement.category
                      .trim()
                      .toUpperCase();

                  const urgent =
                    category === "URGENT" ||
                    category === "IMPORTANT";

                  return (

                    <article
                      key={announcement.id}
                      className={`announcement-card ${
                        urgent
                          ? "urgent-card"
                          : ""
                      }`}
                    >

                      {/* CARD TOP */}

                      <div className="card-top">

                        <span
                          className={`category-badge ${
                            urgent
                              ? "urgent-badge"
                              : ""
                          }`}
                        >
                          {urgent
                            ? "🔴 URGENT"
                            : announcement.category}
                        </span>

                        <span className="announcement-date">

                          {new Date(
                            announcement.createdAt
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}

                        </span>

                      </div>

                      {/* TITLE */}

                      <h2>
                        {announcement.title}
                      </h2>

                      {/* CONTENT */}

                      <p>
                        {announcement.content}
                      </p>

                      {/* FOOTER */}

                      <div className="card-footer">

                        <span>
                          Posted by{" "}
                          <strong>
                            {
                              announcement
                                .author
                                .username
                            }
                          </strong>
                        </span>

                        <span
                          className={`status-dot ${
                            urgent
                              ? "urgent-dot"
                              : ""
                          }`}
                        ></span>

                      </div>

                    </article>
                  );
                }
              )}

            </div>
          )}

        </div>

      </div>

    </main>
  );
}