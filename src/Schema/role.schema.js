const joi = require('joi');
const message = require('../lib/message');

const roleSchema = {};

// roleSchema.statics.validaSchema = joi.object({
roleSchema.validaSchema = joi.object({
    rol: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar un Rol";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar un Rol Valido";                                             
                        break;
                    default:
                        break;
                }
            });

            return errors;
        })
});

module.exports = roleSchema;