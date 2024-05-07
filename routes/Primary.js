const express=require('express');
const { check } = require('express-validator');

const router=express.Router();

const { statuses } = require('../models/Constants');
const createPrimary = require('../controllers/Primary/create');
const { MapValidationKeys } = require('../models/MapValidationKeys');
const { PrimaryRequiredKeys } = require('../models/Primary');


router.post("/",

    ...MapValidationKeys(PrimaryRequiredKeys, 'CREATE'),

    check('name')
        .exists().withMessage('Name is required')
        .notEmpty().withMessage('Name cannot be empty'),

    check('env')
        .optional()
        .notEmpty().withMessage('ENV cannot be empty')
        .isIn(Object.keys(statuses.environments)).withMessage(`App ENV value can be either ${Object.keys(statuses.environments).join(',')}`),

    createPrimary
);

module.exports = router;
