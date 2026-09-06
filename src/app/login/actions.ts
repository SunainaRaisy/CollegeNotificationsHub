'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { encrypt } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  if (!username || !password) {
    return { error: 'Username and password are required' };
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return { error: 'Invalid username or password' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return { error: 'Invalid username or password' };
  }

  // Create session
  const session = await encrypt({ id: user.id, username: user.username, role: user.role, department: user.department });
  const c = await cookies();
  
  c.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  if (user.role === 'ADMIN') {
    redirect('/admin');
  } else {
    redirect('/dashboard');
  }
}

export async function logout() {
  const c = await cookies();
  c.delete('session');
  redirect('/login');
}
