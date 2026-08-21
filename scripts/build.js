const { execSync } = require('child_process');

// Ensure DATABASE_URL is set for Vercel/cloud build environment
process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./dev.db';

console.log('--------------------------------------------------');
console.log('🚀 Starting Govindraj Watch & Gifts Production Build');
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('--------------------------------------------------');

try {
  console.log('📦 Pushing Prisma DB schema...');
  execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit', env: process.env });

  console.log('🌱 Seeding authentic store products...');
  execSync('npx tsx prisma/seed.ts', { stdio: 'inherit', env: process.env });

  console.log('⚙️ Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit', env: process.env });

  console.log('🏗️ Building Next.js production bundle...');
  execSync('npx next build', { stdio: 'inherit', env: process.env });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
