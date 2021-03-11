const joi = require('joi');
const message = require('../lib/message');

const userSchema = {};

userSchema.validaSchema = joi.object({
    username: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar un UserName";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar un UserName Valido";                                             
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } })
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":
                        err.message = "Debe ingresar un Email";                        
                        break;
                    case "string.empty":                        
                    case "string.email":
                        err.message = "Debe ingresar un Email Valido";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    password: joi.string()
        .min(5)
        .max(20)
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":
                        err.message = "Debe ingresar un Password";                        
                        break;
                    case "string.empty":
                    case "string.min":
                        err.message = "El Password debe tenaer un minimo de 6 carracteres";                        
                        break;
                    case "string.max":
                        err.message = "El Password debe tenaer un maximo de 20 carracteres";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    id_rol: joi.number()
        .integer()
        .min(0)
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar un Id Rol";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar un Id Rol Valido";                                             
                        break;
                    case "number.base":
                        err.message = "El Id Rol debe ser un numero Entero Valido";                                             
                        break;
                    case "number.min":
                        err.message = "El Id Rol debe tener valores Positivos";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        })
});

module.exports = userSchema;