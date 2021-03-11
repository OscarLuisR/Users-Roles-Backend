const { rolModel } = require('../db/database');

const rolesCtrl = {};

rolesCtrl.getRoles = async (req, res) => {
    try {
        const results = await rolModel.findAll({ attributes: ['id_rol', 'rol']});

        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

rolesCtrl.getRolId = async (req, res) => {
    const { id_rol } = req.params;

    try {
        const results = await rolModel.findOne({
            attributes: ['id_rol', 'rol'],
            where: { id_rol: id_rol }
        });

        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

rolesCtrl.createRol = async (req, res) => {
    const { rol } = req.body;

    try {
        const results = await rolModel.create({ rol });
        
        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }    
};

rolesCtrl.updateRol = async (req, res) => {
    const { id_rol } = req.params;

    try {
        const results = await rolModel.update(req.body, { where: { id_rol: id_rol }});

        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

rolesCtrl.deleteRol = async (req, res) => {
    const { id_rol } = req.params;

    try {
        const results = await rolModel.destroy({ where: { id_rol: id_rol } });

        res.status(200).json({ status: 200, error: false, message: '', results});


    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

module.exports = rolesCtrl;