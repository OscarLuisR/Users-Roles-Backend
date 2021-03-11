const { userModel, rolModel } = require('../db/database');
const bcrypt = require('bcryptjs');

const InitialSetup = {};

InitialSetup.createRolUserAdmin = async () => {
    try {
        let id_rol;

        // Verifica si existe el Rol de Administrdor
        const rolFind = await rolModel.findOne({ where: {rol: 'Admin' }});

        // Si existe toma el campo id_rol
        if (rolFind) {   
            id_rol = rolFind.id_rol;         
        }else {
            // Si NO existe, crea el registro en la tabla
            const role = await rolModel.create({rol: 'Admin'});

            if (!role) {
                return;
            }

            // Obtiene el campo id_rol
            id_rol = role.id_rol;

            console.log('Rol Creado!');
        }

        // Verifica si existe el Usuario Administrdor
        const userFind = await userModel.findOne({ where: {email: 'admin@admin.com' }});

        if (!userFind) {
            const newUsuario = {
                username: "Admin",
                email: "admin@admin.com",
                password: await encriptarPassword('admin'),
                id_rol: id_rol
            };

            const user = await userModel.create(newUsuario);

            if (!user) {
                return;                
            }

            console.log('Usuario Creado!'); 
        }

    } catch (err) {
        console.log(err);
    }
};

encriptarPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

module.exports = InitialSetup;