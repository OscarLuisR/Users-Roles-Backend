const { userModel, rolModel } = require('../db/database');
const bcrypt = require('bcryptjs');

const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
    try {
        const results = await userModel.findAll({
            attributes: ['id', 'username', 'email'],
            include: { 
                model: rolModel,
                attributes: ['rol']
            }
        });

        res.status(200).json({ status: 200, error: false, message: '', results});        

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

userCtrl.getUserId = async (req, res) => {
    const { id } = req.params;

    try {
        const results = await userModel.findOne({
            attributes: ['id', 'username', 'email'],
            where: { id: id },
            include: { 
                model: rolModel,
                attributes: ['rol']
            }
        });

        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

userCtrl.createUser = async (req, res) => {
    const { username, email, password, id_rol } = req.body;

    try {
        const newUser = ({
            username,
            email,
            password: await encriptarPassword(password),
            id_rol
        });

        const results = await userModel.create(newUser);
        
        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

userCtrl.updateUser = async (req, res) => {
    const { id } = req.params;        
    const { password } = req.body;

    try {
        // VERIFICAR SI SE INGRESO UN PASSWORD
        if (password) {
            req.body.password = await encriptarPassword(password);
        }

        const results = await userModel.update(req.body, {where: {id: id}});

        res.status(200).json({ status: 200, error: false, message: '', results});

    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }
};

userCtrl.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {        
        const results = await userModel.destroy({where: {id: id}});

        res.status(200).json({ status: 200, error: false, message: '', results});
        
    } catch (err) {
        return res.json({ status: 401, error: true, message: err.message, results: "" });
    }    
};

encriptarPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

module.exports = userCtrl;