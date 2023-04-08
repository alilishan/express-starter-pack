const { nanoid } = require("nanoid");
const { initLogger, insertLogger } = require('@ounch/logger');

const Prisma = require("../prisma/config");


// Init Logger
initLogger(process.env.APP_LOG_PATH);


const useLogger = async (req, res, next) => {
    const start = Date.now();

    // Append Req ID
    req.id = req.headers['gateway-uuid'] || nanoid(10);
    req.ipAddress = req.headers['x-real-ip'] || ''
    res.setHeader('gateway-uuid', req.id);

    // call next in chain
    await next();

    const { id, method, url, query, body, ipAddress } = req;
    const { statusCode, statusMessage } = res;
    const end = Date.now();

    // Log to File
    insertLogger(req, 'API-REQUEST');

    // Log to DB
    await Prisma.logs.create({
        data: {
            reqId: id,
            action: 'API-REQUEST',
            url,
            method,
            ipAddress,
            request: JSON.stringify({ query, body }),
            response: JSON.stringify({ statusCode, statusMessage }),
            duration: `${end - start}ms`,
            props: ''
        }
    })
}

const logEvent = async (req, data) => {
    return new Promise(async (resolve, reject) => {

        const { id } = req;
        const { action } = data;

        // Log to File
        insertLogger(req, action);

        // Log to DB
        await Prisma.logs.create({
            data: {
                reqId: id,
                ...data
            }
        })

        resolve();
    })
}

module.exports = {
    useLogger,
    logEvent
}
