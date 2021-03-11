const { rolModel } = require('../db/database');
const roleSchema = require('../Schema/role.schema');

const verificaRol = {};

verificaRol.verificaDatosRegistroRol = async (req, res, next) => {
    const { rol } = req.body;

    try {
        const { error } = await roleSchema.validaSchema.validate(req.body);

        if (error) {
            return res.json({ status: 400, error: true, message: error.details[0].message, results: "" });
        }

        // VERIFICAR SI EL ROL YA EXISTE EN LA BD
        const rolFind = await rolModel.findOne({ where: { rol: rol }});

        if (rolFind) {
            return res.json({ status: 400, error: true, message: 'Rol Ya Existe', results: "" });
        }

        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

verificaRol.verificaDatosUpdateRol = async (req, res, next) => {
    const { rol } = req.body;
    const { id_rol } = req.params;

    try {
        const { error } = await roleSchema.validaSchema.validate(req.body);

        if (error) {
            // VERIFICAR QUE CAMPOS SE INGRESARON PARA COMPROBAR SI YA EXISTEN EN LA BD
            if ((rol !== undefined && error.details[0].context.key == 'rol')) {
                return res.json({ status: 400, error: true, message: error.details[0].message, results: "" });
            }
        }

        // SI SE INGRESO EL ROL SE VERIFICA SI YA EXISTE EN LA BD PARA OTRO
        if (rol !== undefined) {
            const rolFind = await rolModel.findOne({ where: { rol: rol }});

            if (rolFind) {
                if (id_rol != rolFind.id_rol) {
                    return res.json({ status: 400, error: true, message: 'Rol Ya Existe', results: "" });
                }
            }
        }

        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

module.exports = verificaRol;