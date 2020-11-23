module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('Fornecedores', {
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
                len: [15],
            },
        },
        deleted_at:{
            type: DataTypes.DATE,
            defaultValue: null
        }
    });

    return User;
}