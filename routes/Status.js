const express=require('express');

const router = express.Router();
const { statuses } = require('../models/Constants');

router.get("/", (req, res) => {
    const status = statuses;
    return res.status(200).json({
        ...status,
        app: {
            version: process.env.APP_VERSION,
            port: process.env.APP_PORT,
        }
    });
});

module.exports = router;
