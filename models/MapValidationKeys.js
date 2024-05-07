const { check } = require("express-validator");

exports.MapValidationKeys = (dataset, method) => {
    const keys = Object.keys(dataset);

    const checks = keys.map(key => {
        const { name, type, isIn, minLength} = dataset[key];
        const item = check(key);

        if (method === 'CREATE')
            item.exists().withMessage(`${name} is required`);

        if (method === 'UPDATE')
            item.optional();

        if (type === 'string') {
            item.isString().withMessage(`${name} must be a string`);
            item.isLength({ min: minLength || 3 }).withMessage(`${name} must be at least 3 chars long`);
        }

        if (type === 'country') {
            item.isString().withMessage(`${name} must be ISO 3166-1 alpha-2 country code`);
            item.isLength({ min: 2, max: 3 }).withMessage(`${name} must be at least 2 and max 3 chars long`);
        }

        if (type === 'number')
            item.isNumeric().withMessage(`${name} must be a number`);

        if (type === 'boolean')
            item.isBoolean({ strict: true }).withMessage(`${name} must be a boolean`);

        if (type === 'float')
            item.isFloat().withMessage(`${name} must be a float`);

        if (type === 'phone')
            item.matches(/\+[0-9]{2,3}[0-9]{8,11}/).withMessage('mobile should be a valid 10/12 digit mobile number with country code. eg: +601234567890 or +911234567890 or +6598765432');

        if(type === 'email')
            item.isEmail().withMessage(`${name} must be a valid email`);

        if (isIn)
            item.isIn(isIn).withMessage(`${name} must be one of ${isIn.join(', ')}`);

        return item;
    });

    return checks;
}
