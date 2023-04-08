const { PrismaClient } = require('@prisma/client');
const { getUnixTime } = require('date-fns');

const Prisma = new PrismaClient({
    errorFormat: 'minimal'
});

// Middleware for logging
Prisma.$use(async (params, next) => {
    const before = Date.now()

    // Append Timestamp
    if (params.action == 'create') {
        params.args.data['createdTs'] = getUnixTime(new Date());
        params.args.data['updatedTs'] = getUnixTime(new Date());
    }
    if (params.action == 'update') {
        params.args.data['updatedTs'] = getUnixTime(new Date());
    }

    const result = await next(params)
    const after = Date.now();

    // console.log(`MEDIA MODULE [${process.env.APP_VERSION}] • PRISMA Query ${params.model}.${params.action} `)
    return result
});

module.exports = Prisma;
