const { User } = require('../models');
const { Op } = require("sequelize");

exports.get = async (req, res, next) => {
  let _id = req.headers.id;
  let _name = req.headers.name;
  let result = undefined;

  console.log(_id + ' ,' + _name);
  try {
    if (_id) {
      result = await User.findAll({
        where: {
          id: _id,
          name: {
            [Op.like]: '%' + _name + '%'
          },
          deleted_at: null
        }
      })

    } else if (_name) {
      result = await User.findAll({
        where: {
          name: {
            [Op.like]: '%' + _name + '%',
          },
          deleted_at: null
        }
      })
    } else {
      result = await User.findAll({
        where:{
            deleted_at: null
        }
      });
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.post = async (req, res, next) => {
  let result = undefined;

  try {
    const users = await User.findAll({
      where: {
        email: req.body.email
      }
    });
    if (users.length > 0) {
      return res.status(400).json('o usuario já está cadastrado')
    } else {
      result = await User.create(req.body);
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
      result = await User.findAll({
        where: {
          id: req.params.id,
          deleted_at: null
        }
      });

      if (result.length > 0) {
        result = await User.findAll({
          where:{
            email: req.headers.email
          }
        })
        if(result.length <=0){
          result = await User.update({ name: req.headers.name, email: req.headers.email, password: req.headers.password }, {
            where: {
              id: req.params.id
            }
          })
        }else{
          return res.status(400).json("Este email já esta em uso!");
        }

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
  try {
    if (req.params.id) {
      result = await User.findAll({
        where: {
          id: req.params.id,
          deleted_at: null
        }
      });

      if (result.length > 0) {
        result = await User.update({ deleted_at:date }, {
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