// const Produto = require('../models/Produto');
const models = require('../models/index');
const { Op } = require("sequelize");


exports.get = async (req, res, next) => {
    let _barcode = req.headers.barcode;
    let _name = req.headers.name;
    let result = undefined;

    console.log(_barcode + ' ,' + _name);
    try {
        if (_barcode) {
            console.log('teem barcode')
            if (_name = 'undefined') { _name = '' }
            result = await models.Produtos.findAll({
                where: {
                    barcode: _barcode,
                    name: {
                        [Op.like]: '%' + _name + '%'
                    },
                    deleted_at: null
                }
            })

        } else if (_name) {
            console.log('tem nome')
            result = await models.Produtos.findAll({
                where: {
                    name: {
                        [Op.like]: '%' + _name + '%',
                    },
                    deleted_at: null
                }
            })
        } else {
            console.log('sem nome e barcode')
            result = await models.Produtos.findAll({
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
        const result = await models.Produtos.findAll({
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
    console.log(req.body.barcode)
    try {
        const Produto = await models.Produtos.findAll({
            where: {
                barcode: req.body.barcode
            }
        });
        if (Produto.length > 0) {
            return res.status(400).json('o produto já está cadastrado')
        } else {
            result = await models.Produtos.create(req.body);
        }

        return res.status(200).json('Produto cadastrado com sucesso!!');

    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

exports.put = async (req, res, next) => {
    let result = undefined;
    try {
        if (req.params.barcode) {
            result = await models.Produtos.findAll({
                where: {
                    barcode: req.params.barcode,
                    deleted_at: null
                }
            });

            if (result.length > 0) {
                result = await models.Produtos.update({ 
                    barcode: req.headers.barcode, 
                    name: req.headers.name,
                    description: req.headers.description}, {
                    where: {
                        barcode: req.params.barcode
                    }
                })
                return res.status(200).json('Produto alterado com sucesso');
            } else {
                console.error('Produto não existe no banco!')
                res.status(400).json('O produto não existe no banco!');
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
    try {
        if (req.params.id) {
            result = await models.Produtos.findAll({
                where: {
                    id: req.params.id,
                    deleted_at: null
                }
            });

            if (result.length > 0) {
                result = await models.Produtos.update({ deleted_at: date }, {
                    where: {
                        id: req.params.id
                    }
                })

                return res.status(200).json('Produto deletado com sucesso');
            } else {
                console.error('Produto não existe no banco!')
                res.status(400).json('O produto não existe no banco!');
            }
        }
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}