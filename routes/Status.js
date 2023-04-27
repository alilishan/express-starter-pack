const express=require('express');

const router = express.Router();
const { statuses } = require('../models/Constants');

router.get("/", (req, res) => {
    const status = statuses;
    return res.status(200).json({ ...status });
});

module.exports = router;
