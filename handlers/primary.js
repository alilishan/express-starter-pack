const { validationResult } = require('express-validator');

const errorHandler = require('./errors');

const primaryHandler = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        return res.status(200).json({
            data: {}
        });

    } catch (error) {
        return errorHandler(error, res);
    }
}

module.exports = primaryHandler;
