const express=require('express');
const { check } = require('express-validator');

const router=express.Router();
const { acceptedEnvironments } = require('../models/Constants');
const primaryHandler = require('../handlers/primary');

router.post("/",

    check('app_name')
        .exists().withMessage('App name is required')
        .notEmpty().withMessage('App name cannot be empty'),

    check('app_env')
        .optional()
        .notEmpty().withMessage('App ENV cannot be empty')
        .isIn([...acceptedEnvironments]).withMessage(`App ENV value can be either ${acceptedEnvironments.join(',')}`),

    primaryHandler
);

module.exports = router;
