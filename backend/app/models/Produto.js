module.exports = (sequelize, DataTypes) =>{
    const model = sequelize.define('Produtos', {
        barcode: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        deleted_at:{
            type: DataTypes.DATE,
            defaultValue: null
        }
    },{ sequelize, modelName: 'Produtos' });

    return model;
}