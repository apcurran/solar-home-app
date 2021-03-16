"use strict";

const Joi = require("joi");

function solarDeviceValidation(data) {
    const schema = Joi.object({
        pricePer500SqFt: Joi
                            .number()
                            .required()
    });

    return schema.validateAsync(data);
}

function batteryPackValidation(data) {
    const schema = Joi.object({
        batteryPrice: Joi
                        .number()
                        .required()
    });

    return schema.validateAsync(data);
}

module.exports = {
    solarDeviceValidation,
    batteryPackValidation
};