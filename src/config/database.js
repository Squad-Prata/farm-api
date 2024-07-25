const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:AWCApeLJdZwwzpjfbxjTGZsHLEBBPPka@viaduct.proxy.rlwy.net:29485/railway',
    },
  },
});

module.exports = prisma;