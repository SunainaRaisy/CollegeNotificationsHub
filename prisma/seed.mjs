import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import bcrypt from 'bcryptjs'

const adapter = new PrismaBetterSqlite3({ url: './dev.db' })
const prisma = new PrismaClient({ adapter })

async function main() {
  const hash = async (pw) => await bcrypt.hash(pw, 10)

  const users = [
    { username: 'Admin', password: await hash('admin'), role: 'ADMIN' },
    { username: 'DEEN', password: await hash('VGNT'), role: 'DEAN' },
    { username: 'Principal', password: await hash('VGNT'), role: 'PRINCIPAL' },
    { username: 'HOD_CSE', password: await hash('CSE'), role: 'HOD', department: 'CSE' },
    { username: 'HOD_CSM', password: await hash('CSM'), role: 'HOD', department: 'CSM' },
    { username: 'HOD_CSD', password: await hash('CSD'), role: 'HOD', department: 'CSD' },
    { username: 'HOD_AIML', password: await hash('AI-ML'), role: 'HOD', department: 'AI-ML' },
    { username: 'HOD_IT', password: await hash('IT'), role: 'HOD', department: 'IT' },
    { username: 'HOD_CIVIL', password: await hash('CIVIL'), role: 'HOD', department: 'CIVIL' },
    { username: 'HOD_MECHANICAL', password: await hash('MECHANICAL'), role: 'HOD', department: 'MECHANICAL' },
    { username: 'HOD_EEE', password: await hash('EEE'), role: 'HOD', department: 'EEE' },
    { username: 'HOD_ECE', password: await hash('ECE'), role: 'HOD', department: 'ECE' },
    { username: 'HOD_EIE', password: await hash('EIE'), role: 'HOD', department: 'EIE' },
    { username: 'faculty1', password: await hash('VGNT'), role: 'FACULTY' }, // example faculty
    { username: 'T and P', password: await hash('VGNT'), role: 'TNP' },
  ]

  for (const user of users) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: user,
    })
  }
  console.log('Database seeded with predefined users.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
