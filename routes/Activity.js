const express=require('express');
const { check } = require('express-validator');
const { statuses } = require('../models/Constants');
const activityCreate = require('../controllers/Activity/create');
const activityRemove = require('../controllers/Activity/remove');
const { checkPagination } = require('../models/Queries');
const queryActivity = require('../controllers/Activity/query');



const router = express.Router();


router.delete('/:id/:deletedBy',
    activityRemove
);


router.post("/query",

    ...checkPagination,

    check('paymentId')
        .optional()
        .isString().withMessage('paymentId must be a string')
        .isLength({ min: 3 }).withMessage('paymentId must be at least 3 chars long'),

    check('transactionId')
        .optional()
        .isLength({ min: 3 }).withMessage('transactionId must be at least 3 chars long')
        .trim(),

    check('code')
        .optional()
        .isString().withMessage('code should be a string'),

    check('action')
        .optional(),

    check('entity')
        .optional(),

    check('actionBy')
        .optional()
        .isString().withMessage('actionBy should be a string'),

    check('entityId')
        .optional()
        .isString().withMessage('entityId should be a string'),

    queryActivity
);


router.post('/',
    check('paymentId')
        .optional()
        .isString().withMessage('paymentId must be a string')
        .notEmpty().withMessage('paymentId cannot be empty'),

    check('transactionId')
        .optional()
        .isString().withMessage('Transaction Id must be a string')
        .notEmpty().withMessage('Transaction Id cannot be empty'),

    check('customerId')
        .optional()
        .isString().withMessage('Customer Id must be a string')
        .notEmpty().withMessage('Customer Id cannot be empty'),

    check('code')
        .optional()
        .isString().withMessage('Code Id must be a string')
        .notEmpty().withMessage('Code Id cannot be empty'),

    check('requestId')
        .optional()
        .isString().withMessage('Request Id must be a string')
        .notEmpty().withMessage('Request Id cannot be empty'),

    check('actionBy')
        .exists().withMessage('Action By is required')
        .isString().withMessage('Action By must be a string')
        .notEmpty().withMessage('Action By cannot be empty'),

    check('action')
        .exists().withMessage('Action is required')
        .isString().withMessage('Action must be a string')
        .notEmpty().withMessage('Action cannot be empty')
        .custom((value) => {
            const regex = /^[A-Z_]+$/;
            if (!regex.test(value)) {
                throw new Error('Action must be in uppercase and only underscore is allowed');
            }
            return true;
        }),

    check('entity')
        .exists().withMessage('Entity is required')
        .isString().withMessage('Entity must be a string')
        .notEmpty().withMessage('Entity cannot be empty'),

    check('description')
        .exists().withMessage('Description is required')
        .isString().withMessage('Description must be a string')
        .notEmpty().withMessage('Description cannot be empty'),

    check('props')
        .optional()
        .isString().withMessage('Props must be a string'),

    check('request')
        .optional()
        .isString().withMessage('Request must be a string'),

    check('response')
        .optional()
        .isString().withMessage('Response must be a string'),

    activityCreate
);


module.exports = router;
