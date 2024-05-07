const { validationResult, matchedData } = require('express-validator');


const Prisma = require('../../prisma/config');
const errorHandler = require('../../handlers/errors');



const activityCreate = async (req, res) => {
    const errors = validationResult(req);
    const requiredData = matchedData(req, { onlyValidData: true });

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {
            paymentId,
            transactionId,
            actionBy,
            ...rest
        } = requiredData;

        // Check if one Id is provided
        if (!paymentId && !transactionId) {
            return res.status(400).json({ message: 'Provide at least one Id' });
        }


        const data = await Prisma.activity.create({
            data: {
                ...rest,
                actionBy,
                ...(paymentId && { paymentId }),
                ...(transactionId && { transactionId }),
            }
        });

        return res.status(200).json({
            message: 'Activity created successfully',
            data
        });

    } catch (error) {
        return errorHandler(error, res);
    }
}

module.exports = activityCreate;
