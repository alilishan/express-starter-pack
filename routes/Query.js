const express=require('express');
const { check } = require('express-validator');

const { statuses } = require('../models/Constants');
const feedbackQuery = require('../controllers/feedback.query');

const router = express.Router();

router.post("/",

    check('skip')
        .exists().withMessage('Skip is needed for pagination')
        .isNumeric().withMessage('Skip must be a number')
        .notEmpty().withMessage('Skip cannot be empty'),

    check('take')
        .exists().withMessage('Take is needed for pagination')
        .isNumeric().withMessage('Take must be a number')
        .notEmpty().withMessage('Take cannot be empty'),

    check('feedbackId')
        .optional()
        .notEmpty().withMessage('Feedback ID cannot be empty')
        .trim(),

    check('userId')
        .optional()
        .notEmpty().withMessage('User ID cannot be empty')
        .trim(),

    check('sessionId')
        .optional()
        .notEmpty().withMessage('Session ID cannot be empty')
        .trim(),

    check('email')
        .optional()
        .notEmpty().withMessage('Email cannot be empty')
        .trim(),

    check('status')
        .optional()
        .notEmpty().withMessage('Status cannot be empty')
        .isIn([...Object.keys(statuses)]).withMessage(`Status value can be either ${Object.keys(statuses).join(', ')}`),

    check('order')
        .optional()
        .notEmpty().withMessage('Order cannot be empty')
        .isIn(['desc', 'asc']).withMessage(`Order value can be either ${['desc', 'asc'].join(', ')}`),

    check('startTimestamp')
        .optional()
        .notEmpty().withMessage('Start Timestamp cannot be empty')
        .isNumeric().withMessage('Start Timestamp must be a number'),

    check('endTimestamp')
        .if(check('startTimestamp').exists())
        .exists().withMessage('End Timestamp is required if Start Timestamp is provided')
        .notEmpty().withMessage('End Timestamp cannot be empty')
        .isNumeric().withMessage('End Timestamp must be a number'),

    feedbackQuery
)


module.exports = router;
