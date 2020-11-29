// const { Fornecedores } = require('../models');
const models = require('../models/index');
const { Op } = require("sequelize");


exports.get = async (req, res, next) => {
    let _cnpj = req.headers.cnpj;
    let _name = req.headers.name;
    let result = undefined;

    console.log(_cnpj + ' ,' + _name);
    try {
        if (_cnpj) {
            console.log('tem cnpj')
            if (_name = 'undefined') { _name = '' }
            result = await models.Fornecedores.findAll({
                where: {
                    cnpj: _cnpj,
                    name: {
                        [Op.like]: '%' + _name + '%'
                    },
                    deleted_at: null
                }
            })

        } else if (_name) {
            console.log('tem nome')
            result = await models.Fornecedores.findAll({
                where: {
                    name: {
                        [Op.like]: '%' + _name + '%',
                    },
                    deleted_at: null
                }
            })
        } else {
            console.log('sem nome e cnpj')
            result = await models.Fornecedores.findAll({
                where: {
                    deleted_at: null
                }
            });
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.getByName = async (req, res, next)=> {
    const _name = req.params.name;
    if (_name){
        const result = await models.Fornecedores.findAll({
            where:{
                name:_name
            }
        });
        if(result.length > 0){
            res.status(200).json(true);
        }else{
            res.status(404).json(false);
        }
    }else{
        res.status(400).json(false);
    }
}

exports.post = async (req, res, next) => {
    let result = undefined;
    console.log(req.body.endereco)
    try {
        const fornecedores = await models.Fornecedores.findAll({
            where: {
                cnpj: req.body.cnpj
            }
        });
        if (fornecedores.length > 0) {
            return res.status(400).json('o usuario já está cadastrado')
        } else {
            result = await models.Fornecedores.create(req.body);
        }

        return res.status(200).json('Usuario cadastrado com sucesso!!');

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.put = async (req, res, next) => {
    let result = undefined;
    try {
        if (req.params.id) {
            result = await models.Fornecedores.findAll({
                where: {
                    id: req.params.id,
                    deleted_at: null
                }
            });

            if (result.length > 0) {
                result = await models.Fornecedores.update({ 
                    name: req.headers.name, 
                    cnpj: req.headers.cnpj, 
                    telefone: req.headers.telefone,
                    endereco: req.headers.endereco}, {
                    where: {
                        id: req.params.id
                    }
                })
                return res.status(200).json('Usuario alterado com sucesso');
            } else {
                console.error('Usuario não existe no banco!')
                res.status(400).json('O usuario não existe no banco!');
            }
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.delete = async (req, res, next) => {
    let result = undefined;
    let date = new Date();

    console.log(date);
    console.log(req.params.id)
    try {
        if (req.params.id) {

            result = await models.Fornecedores.findAll({
                where: {
                    'id':req.params.id
                }
            })
            
            if (result.length > 0) {
                result = await models.Fornecedores.update({ deleted_at: date }, {
                    where: {
                        id: req.params.id
                    }
                })

                return res.status(200).json('Usuario deletado com sucesso');
            } else {
                console.error('Usuario não existe no banco!')
                res.status(400).json('O usuario não existe no banco!');
            }
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}