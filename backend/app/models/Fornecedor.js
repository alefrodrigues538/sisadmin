module.exports = (sequelize, DataTypes) =>{
    const model = sequelize.define('Fornecedores', {
        name: DataTypes.STRING,
        cnpj: {
            type: DataTypes.STRING,
            validate:{
                len: [18],
            }
        },
        telefone: {
            type: DataTypes.STRING,
            validate:{
                len: [14, 15],
            },
        },
        endereco: {
            type: DataTypes.STRING,
            validate:{
                len: [0,256],
            },
        },
        deleted_at:{
            type: DataTypes.DATE,
            defaultValue: null
        }
    }, { sequelize, modelName: 'Fornecedores'});

    return model;
}