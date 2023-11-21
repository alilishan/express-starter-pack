const { check } = require("express-validator");

exports.MapValidationKeys = (dataset, method) => {
    const keys = Object.keys(dataset);

    const checks = keys.map(key => {
        const { name, type, isIn } = dataset[key];
        const item = check(key);

        if (method === 'CREATE')
            item.exists().withMessage(`${name} is required`);

        if (method === 'UPDATE')
            item.optional();

        if (type === 'string')
            item.isString().withMessage(`${name} must be a string`);
            item.isLength({ min: 3 }).withMessage(`${name} must be at least 3 chars long`);

        if (type === 'number')
            item.isNumeric().withMessage(`${name} must be a number`);

        if (type === 'boolean')
            item.isBoolean({ strict: true }).withMessage(`${name} must be a boolean`);

        if (type === 'float')
            item.isFloat().withMessage(`${name} must be a float`);

        if (type === 'phone')
            item.matches(/^\d{9,12}$/).withMessage('mobile should be a valid 10/12 digit mobile number');

        if(type === 'email')
            item.isEmail().withMessage(`${name} must be a valid email`);

        if (isIn)
            item.isIn(isIn).withMessage(`${name} must be one of ${isIn.join(', ')}`);

        return item;
    });

    return checks;
}
