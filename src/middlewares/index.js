const { verificaDatosLogin, verificaToken, verificaPermisoAdmin } = require('./verificaAuth');
const { verificaDatosRegistroUser, verificaDatosUpdateUser } = require('./verificaUser');
const { verificaDatosRegistroRol, verificaDatosUpdateRol } = require('./verificaRol');

module.exports = {
    verificaDatosLogin,
    verificaToken,
    verificaPermisoAdmin,
    verificaDatosRegistroUser, 
    verificaDatosUpdateUser,    
    verificaDatosRegistroRol, 
    verificaDatosUpdateRol
};