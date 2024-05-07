const { validationResult, matchedData } = require('express-validator');

const errorHandler = require('../../handlers/errors');
const Prisma = require('../../prisma/config');


const queryActivity = async (req, res) => {
    const errors = validationResult(req);
    const requiredData = matchedData(req, { onlyValidData: true });

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const {
            skip,
            take,
            orderBy,
            orderSort,
            startTimestamp,
            endTimestamp,
            code,
            include,
            ...rest
        } = requiredData;

        const where = {
            ...(rest && rest),
            ...(startTimestamp && {
                createdTs: {
                    gte: parseInt(startTimestamp),
                    lte: parseInt(endTimestamp)
                }
            }),
            ...(code && {
                code: {
                    contains: code
                }
            })
        };

        const pagination = {
            ...(skip && { skip: parseInt(skip) }),
            ...(take && { take: parseInt(take) })
        }

        const order = {
            ...orderBy && {
                [orderBy]: orderSort
            },
        }

        const transaction = await Prisma.$transaction([
            Prisma.activity.count({
                where
            }),
            Prisma.activity.findMany({
                where,
                orderBy: order,
                ...pagination,
                ...(include && { include: { ...include } })
            })
        ]);


        return res.status(200).json({
            _count: transaction[0],
            data: transaction[1]
        });

    } catch (error) {
        return errorHandler(error, res);
    }
}

module.exports = queryActivity;
