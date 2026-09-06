"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Edit } from "lucide-react";
import "../admin.css";
import { getStaff, deleteStaff, addStaff, editStaff } from "../../actions";

export default function ManageStaff() {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    const data = await getStaff();
    setStaff(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this staff member?")) {
      await deleteStaff(id);
      loadStaff();
    }
  };

  const handleEdit = async (member: any) => {
    const newName = prompt("Edit Name:", member.name);
    if (newName === null) return;
    const newDesignation = prompt("Edit Designation:", member.designation);
    if (newDesignation === null) return;
    const newDepartment = prompt("Edit Department:", member.department);
    if (newDepartment === null) return;
    
    if (newName && newDesignation && newDepartment) {
      await editStaff(member.id, { name: newName, designation: newDesignation, department: newDepartment });
      loadStaff();
    }
  };

  const handleAdd = async () => {
    const name = prompt("Staff Name:");
    if (!name) return;
    const designation = prompt("Designation:");
    const department = prompt("Department:");
    if (name && designation && department) {
      await addStaff({ name, designation, department });
      loadStaff();
    }
  };

  return (
    <main className="admin-page">
      <div className="admin-glow admin-glow-one"></div>
      <div className="admin-container">
        <Link href="/admin" className="admin-back">
          <ArrowLeft size={17} /> Back to Dashboard
        </Link>
        <header className="admin-header" style={{ marginBottom: '2rem' }}>
          <div>
            <h1>Manage Staff</h1>
            <p>View, edit, or delete staff details.</p>
          </div>
          <button onClick={handleAdd} className="quick-button" style={{ marginLeft: 'auto' }}>
            Add Staff
          </button>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {loading ? <p>Loading...</p> : staff.map((member) => (
            <div key={member.id} style={{ background: 'rgba(20, 22, 35, 0.6)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem' }}>{member.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{member.designation} • {member.department}</p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={() => handleEdit(member)} style={{ background: 'transparent', border: 'none', color: 'var(--neon-blue)', cursor: 'pointer' }}><Edit size={20} /></button>
                <button onClick={() => handleDelete(member.id)} style={{ background: 'transparent', border: 'none', color: 'var(--neon-red)', cursor: 'pointer' }}><Trash2 size={20} /></button>
              </div>
            </div>
          ))}
          {!loading && staff.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No staff found in the database.</p>}
        </div>
      </div>
    </main>
  );
}
