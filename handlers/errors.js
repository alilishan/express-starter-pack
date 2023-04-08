const { Prisma } = require('@prisma/client');

const errorHandler = (error, res) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ errors: `DB Error: ${error.message} (${error.code})`})
    } else {
        return res.status(400).json({ errors: error.toString() });
    }
} 

module.exports = errorHandler;