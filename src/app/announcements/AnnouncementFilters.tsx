import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Megaphone,
  CalendarDays,
  Users,
  MessageCircle,
  Plus,
} from "lucide-react";
import "./admin.css";

export default function AdminPage() {
  return (
    <main className="admin-page">

      <div className="admin-glow admin-glow-one"></div>
      <div className="admin-glow admin-glow-two"></div>

      <div className="admin-container">

        {/* BACK */}

        <Link href="/" className="admin-back">
          <ArrowLeft size={17} />
          Back to Home
        </Link>

        {/* HEADER */}

        <header className="admin-header">

          <div className="admin-icon">
            <ShieldCheck size={32} />
          </div>

          <div>
            <div className="admin-small">
              NOTIFYHUB
            </div>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Manage announcements, events, staff and student queries.
            </p>
          </div>

        </header>

        {/* DASHBOARD CARDS */}

        <section className="admin-grid">

          {/* ANNOUNCEMENTS */}

          <Link
            href="/admin/announcements"
            className="admin-card"
          >
            <div className="admin-card-icon">
              <Megaphone size={26} />
            </div>

            <h2>
              Announcements
            </h2>

            <p>
              Create, edit and delete college announcements.
            </p>

            <span className="admin-card-action">
              Manage →
            </span>
          </Link>

          {/* EVENTS */}

          <Link
            href="/admin/events"
            className="admin-card"
          >
            <div className="admin-card-icon">
              <CalendarDays size={26} />
            </div>

            <h2>
              Events
            </h2>

            <p>
              Add and manage upcoming college events.
            </p>

            <span className="admin-card-action">
              Manage →
            </span>
          </Link>

          {/* STAFF */}

          <Link
            href="/admin/staff"
            className="admin-card"
          >
            <div className="admin-card-icon">
              <Users size={26} />
            </div>

            <h2>
              Staff
            </h2>

            <p>
              Add and manage faculty and staff details.
            </p>

            <span className="admin-card-action">
              Manage →
            </span>
          </Link>

          {/* QUERIES */}

          <Link
            href="/admin/queries"
            className="admin-card"
          >
            <div className="admin-card-icon">
              <MessageCircle size={26} />
            </div>

            <h2>
              Student Queries
            </h2>

            <p>
              View student questions and send replies.
            </p>

            <span className="admin-card-action">
              View Queries →
            </span>
          </Link>

        </section>

        {/* QUICK ACTION */}

        <section className="admin-quick">

          <div>
            <span className="quick-label">
              QUICK ACTION
            </span>

            <h2>
              Publish a new announcement
            </h2>

            <p>
              Quickly notify students about important updates.
            </p>
          </div>

          <Link
            href="/admin/announcements/new"
            className="quick-button"
          >
            <Plus size={18} />
            New Announcement
          </Link>

        </section>

      </div>

    </main>
  );
}