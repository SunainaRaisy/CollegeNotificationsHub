'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitQuery(formData: FormData) {
  const studentName = formData.get('studentName') as string;
  const rollNo = formData.get('rollNo') as string;
  const department = formData.get('department') as string;
  const question = formData.get('question') as string;

  if (!studentName || !rollNo || !department || !question) {
    return { error: 'All fields are required.' };
  }

  try {
    await prisma.query.create({
      data: {
        studentName,
        rollNo,
        department,
        question,
      },
    });

    revalidatePath('/contact');
    return { success: true };
  } catch (error) {
    console.error('Error submitting query:', error);
    return { error: 'Failed to submit query. Please try again.' };
  }
}
