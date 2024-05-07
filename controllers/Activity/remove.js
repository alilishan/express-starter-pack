


const Prisma = require('../../prisma/config');
const errorHandler = require('../../handlers/errors');
const { LogActivity } = require('../../models/Activity');



const activityRemove = async (req, res) => {

    const { id, deletedBy } = req.params;

    const where = {
        id: parseInt(id)
    };

    try {
        const check = await Prisma.activity.findUnique({
            where
        });

        if (!check) {
            return res.status(400).json({ message: 'Activity not found' });
        }

        const data = await Prisma.activity.delete({
            where
        });

        // Log Activity
        await LogActivity({
            ...(check.paymentId && { paymentId: check.paymentId }),
            ...(check.transactionId && { transactionId: check.transactionId }),
            actionBy: deletedBy,
            action: 'ACTIVITY_REMOVED',
            entity: 'ACTIVITY',
            description: 'Activity removed',
            props: JSON.stringify({check})
        });

        return res.status(200).json({
            message: 'Activity removed successfully',
            data
        });

    } catch (error) {
        return errorHandler(error, res);
    }
}

module.exports = activityRemove;
