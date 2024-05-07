const Prisma = require("../prisma/config")

exports.LogActivity = async (logData) => {
    const data = await Prisma.activity.create({
        data: {
            ...logData
        }
    });

    return data;
}
