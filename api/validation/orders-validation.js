"use strict";

const Joi = require("joi");

function ordersValidation(data) {
    const schema = Joi.object({
        paymentId:              Joi
                                    .string()
                                    .required(),
        firstName:              Joi
                                    .string()
                                    .required(),
        lastName:               Joi
                                    .string()
                                    .required(),
        email:                  Joi
                                    .string()
                                    .email()
                                    .required(),
        phone:                  Joi
                                    .string()
                                    .min(10)
                                    .max(10)
                                    .required(),
        street:                 Joi
                                    .string()
                                    .required(),
        state:                  Joi
                                    .string()
                                    .min(2)
                                    .max(2)
                                    .required(),
        zip:                    Joi
                                    .string()
                                    .min(5)
                                    .max(5)
                                    .required(),
        selectedSolarDevice:    Joi
                                    .string()
                                    .required(),
        accessoryBatteryPack:   Joi
                                    .boolean()
                                    .required(),
        homeSqFt:               Joi
                                    .number()
                                    .min(500)
                                    .required()
    });

    return schema.validateAsync(data);
}

module.exports = {
    ordersValidation
};