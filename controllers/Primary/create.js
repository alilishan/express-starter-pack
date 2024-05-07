const { validationResult, matchedData } = require('express-validator');


const errorHandler = require('../../handlers/errors');



const createPrimary = async (req, res) => {
    const errors = validationResult(req);
    const requiredData = matchedData(req, { onlyValidData: true });

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {
            ...rest
        } = requiredData;


        return res.status(200).json({
            message: 'Primary created successfully',
            requiredData
        });

    } catch (error) {
        return errorHandler(error, res);
    }
}

module.exports = createPrimary;
