module.exports = (sequelize, DataTypes) =>{
    const model = sequelize.define('User', {
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate:{
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            validate:{
                len: [8, 12],
            },
        },
        deleted_at:{
            type: DataTypes.DATE,
            defaultValue: null
        }
    }, { sequelize , modelName: "User"});

    return model;
}