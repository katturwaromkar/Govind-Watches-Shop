const { execSync } = require('child_process');

process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./dev.db';

try {
  console.log('⚙️ Running Prisma generate postinstall...');
  execSync('npx prisma generate', { stdio: 'inherit', env: process.env });
} catch (error) {
  console.warn('⚠️ Warning: Prisma generate postinstall skipped:', error.message);
}
