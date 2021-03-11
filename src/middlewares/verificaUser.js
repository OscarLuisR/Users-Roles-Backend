const { userModel, rolModel } = require('../db/database');
const userSchema = require('../Schema/user.schema');

const verificaUser = {};

verificaUser.verificaDatosRegistroUser = async (req, res, next) => {
    const { username, email, id_rol } = req.body;

    try {
        const { error } = await userSchema.validaSchema.validate(req.body);

        if (error) {
            return res.json({ status: 400, error: true, message: error.details[0].message, results: "" });
        }

        // VERIFICAR SI EL USERNAME YA EXISTE EN LA BD
        const usernameFind = await userModel.findOne({ where: { username: username }});

        if (usernameFind) {
            return res.json({ status: 400, error: true, message: 'Usuario Ya Existe', results: "" });
        }
        
        // VERIFICAR SI EL EMAIL YA EXISTE EN LA BD
        const emailFind = await userModel.findOne({ where: { email: email }});

        if (emailFind) {
            return res.json({ status: 400, error: true, message: 'Email Ya Existe', results: "" });
        }

        // VERIFICAR SI EL ROL EXISTE EN LA BD
        const id_rolFind = await rolModel.findOne({ where: { id_rol: id_rol }});

        if (!id_rolFind) {
            return res.json({ status: 400, error: true, message: 'El Rol NO Existe', results: "" });
        }

        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

verificaUser.verificaDatosUpdateUser = async (req, res, next) => {
    const { username, email, password, id_rol } = req.body;
    const { id } = req.params;

    try {
        const { error } = await userSchema.validaSchema.validate(req.body);

        if (error) {
            // VERIFICAR QUE CAMPOS SE INGRESARON PARA COMPROBAR SI YA EXISTEN EN LA BD
            if ((username !== undefined && error.details[0].context.key == 'username') ||
                (email !== undefined && error.details[0].context.key == 'email') ||
                (password !== undefined && error.details[0].context.key == 'password') ||
                (id_rol !== undefined && error.details[0].context.key == 'id_rol')) {
                return res.json({ status: 400, error: true, message: error.details[0].message, results: "" });
            }
        }

        // VERIFICAR SI SE INGRESO UN USERNAME PARA COMPROBAR SI YA EXISTE EN LA BD
        if (username !== undefined) {
            const usernameFind = await userModel.findOne({ where: { username: username }});

            if (usernameFind) {
                if (id != usernameFind.id) {
                    return res.json({ status: 400, error: true, message: 'Usuario Ya Existe', results: "" });
                }
            }
        }

        // VERIFICAR SI SE INGRESO UN EMAIL PARA COMPROBAR SI YA EXISTE EN LA BD
        if (email !== undefined) {
            const emailFind = await userModel.findOne({ where: { email: email }});

            if (emailFind) {
                if (id != emailFind.id) {
                    return res.json({ status: 400, error: true, message: 'Email Ya Existe', results: "" });
                }
            }
        }

        // VERIFICAR SI EL ROL EXISTE EN LA BD
        if (id_rol !== undefined) {
            // VERIFICAR SI EL ROL EXISTE EN LA BD
            const id_rolFind = await rolModel.findOne({ where: { id_rol: id_rol }});

            if (!id_rolFind) {
                return res.json({ status: 400, error: true, message: 'El Rol NO Existe', results: "" });
            }
        }
                
        next();

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }   
};

module.exports = verificaUser;