"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Ensure a default admin user exists
async function getOrCreateAdmin() {
  let admin = await prisma.user.findUnique({ where: { username: "Admin" } });
  if (!admin) {
    admin = await prisma.user.create({
      data: {
        username: "Admin",
        password: "password",
        role: "ADMIN",
      }
    });
  }
  return admin;
}

export async function addAnnouncement(data: { title: string; content: string; category: string; authorUsername?: string }) {
  let user = await prisma.user.findUnique({ where: { username: data.authorUsername || "Admin" } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        username: data.authorUsername || "Admin",
        password: "password",
        role: "STAFF",
      }
    });
  }

  await prisma.announcement.create({
    data: {
      title: data.title,
      content: data.content,
      category: data.category,
      authorId: user.id,
    }
  });

  revalidatePath("/");
  revalidatePath("/announcements");
  revalidatePath("/admin/announcements");
}

export async function deleteAnnouncement(id: string) {
  await prisma.announcement.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/announcements");
  revalidatePath("/admin/announcements");
}

export async function addEvent(data: { title: string; description: string; category: string; date: string; location: string }) {
  await prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      category: data.category,
      date: new Date(data.date),
      location: data.location,
    }
  });
  revalidatePath("/admin/events");
}

export async function deleteEvent(id: string) {
  await prisma.event.delete({ where: { id } });
  revalidatePath("/admin/events");
}

export async function addStaff(data: { name: string; designation: string; department: string }) {
  await prisma.staff.create({
    data: {
      name: data.name,
      designation: data.designation,
      department: data.department,
    }
  });
  revalidatePath("/admin/staff");
}

export async function deleteStaff(id: string) {
  await prisma.staff.delete({ where: { id } });
  revalidatePath("/admin/staff");
}

export async function deleteQuery(id: string) {
  await prisma.query.delete({ where: { id } });
  revalidatePath("/admin/queries");
}

export async function answerQuery(id: string, answer: string) {
  await prisma.query.update({
    where: { id },
    data: { answer, isAnswered: true }
  });
  revalidatePath("/admin/queries");
}

export async function getAnnouncements() {
  return await prisma.announcement.findMany({ orderBy: { createdAt: 'desc' }, include: { author: true } });
}

export async function getEvents() {
  return await prisma.event.findMany({ orderBy: { date: 'asc' } });
}

export async function getStaff() {
  return await prisma.staff.findMany({ orderBy: { name: 'asc' } });
}

export async function getQueries() {
  return await prisma.query.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function editAnnouncement(id: string, data: { title: string; content: string }) {
  await prisma.announcement.update({
    where: { id },
    data: { title: data.title, content: data.content }
  });
  revalidatePath("/");
  revalidatePath("/announcements");
  revalidatePath("/admin/announcements");
}

export async function editEvent(id: string, data: { title: string; date: string; location: string }) {
  await prisma.event.update({
    where: { id },
    data: { title: data.title, date: new Date(data.date), location: data.location }
  });
  revalidatePath("/admin/events");
}

export async function editStaff(id: string, data: { name: string; designation: string; department: string }) {
  await prisma.staff.update({
    where: { id },
    data: { name: data.name, designation: data.designation, department: data.department }
  });
  revalidatePath("/admin/staff");
}
