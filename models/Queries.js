const { check, query } = require('express-validator');
const { statuses } = require('./Constants');

exports.queryPagination = [
    query('skip')
        .if(query('take').exists())
        .exists().withMessage('Skip is needed for pagination')
        .isNumeric().withMessage('Skip must be a number')
        .notEmpty().withMessage('Skip cannot be empty'),

    query('take')
        .if(query('skip').exists())
        .exists().withMessage('Take is needed for pagination')
        .isNumeric().withMessage('Take must be a number')
        .notEmpty().withMessage('Take cannot be empty'),

    query('startTimestamp')
        .if(query('endTimestamp').exists())
        .exists().withMessage('Start timestamp is needed for pagination')
        .isNumeric().withMessage('Start timestamp must be a number')
        .notEmpty().withMessage('Start timestamp cannot be empty'),

    query('endTimestamp')
        .if(query('startTimestamp').exists())
        .exists().withMessage('End timestamp is needed for pagination')
        .isNumeric().withMessage('End timestamp must be a number')
        .notEmpty().withMessage('End timestamp cannot be empty'),

    query('order')
        .optional()
        .notEmpty().withMessage('Order cannot be empty')
        .isIn(['desc', 'asc']).withMessage(`Order value can be either ${['desc', 'asc'].join(', ')}`),

    query('status')
        .optional()
        .notEmpty().withMessage('Status cannot be empty')
        .isIn(Object.keys(statuses)).withMessage(`Status value can be either ${Object.keys(statuses).join(', ')}`),
]
