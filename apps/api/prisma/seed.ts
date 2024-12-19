import { PrismaClient } from '@prisma/client';
import * as bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.note.deleteMany();
  await prisma.user.deleteMany();

  // Create test user
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: await bcryptjs.hash('testpassword123', 10),
      isVerified: true,
    },
  });

  // Project Meeting Notes
  await prisma.note.create({
    data: {
      title: "Q4 Project Planning Meeting",
      text: `# Q4 Project Planning Summary

## Key Objectives
* Launch new user dashboard
* Improve API performance
* Implement analytics integration

## Action Items
1. Frontend team to start dashboard wireframes
2. Backend team to optimize database queries
3. DevOps to set up monitoring

## Timeline
Next sprint starts on Monday with dashboard implementation.`,
      author: {
        connect: { id: testUser.id }
      }
    },
  });

  // Shopping List
  await prisma.note.create({
    data: {
      title: "Weekly Grocery List",
      text: `# Shopping List for Week

## Produce
* Organic apples
* Baby spinach
* Cherry tomatoes

## Dairy
* Greek yogurt
* Almond milk
* Cheese

## Pantry
* Whole grain pasta
* Olive oil
* Quinoa`,
      author: {
        connect: { id: testUser.id }
      }
    },
  });

  // Personal Todo
  await prisma.note.create({
    data: {
      title: "Personal Development Goals",
      text: `# Q1 2024 Goals

1. Technical Skills
   * Master GraphQL
   * Learn Kubernetes basics
   * Complete AWS certification

2. Soft Skills
   * Improve presentation skills
   * Join Toastmasters
   * Read 2 leadership books

3. Health & Wellness
   * Exercise 3x per week
   * Meditate daily
   * Maintain work-life balance`,
      author: {
        connect: { id: testUser.id }
      }
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
