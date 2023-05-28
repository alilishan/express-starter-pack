const { validationResult, matchedData } = require('express-validator');

const errorHandler = require('../handlers/errors');
const Prisma = require('../prisma/config');
const { customAlphabet } = require('nanoid');

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);

const maintenanceCreate = async (req, res) => {
    const errors = validationResult(req);
    const requiredData = matchedData(req, { onlyValidData: true });

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { allowedIps, ...rest } = requiredData;
        const maintenanceId = nanoid(10);
        const status = 'ACTIVE';

        const data = await Prisma.schedules.create({
            data: {
                ...rest,
                maintenanceId,
                status,

                allowedIps: {
                    createMany: {
                        data: allowedIps.map(ipAddress => ({ ipAddress }))
                    }
                }
            },
            include: {
                allowedIps: true
            }
        });

        return res.status(200).json({
            data
        });

    } catch (error) {
        return errorHandler(error, res);
    }
}

module.exports = maintenanceCreate;
