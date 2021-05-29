module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('Uploads', {
        owner_id: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        size: {
            type: DataTypes.INTEGER,
        },
        mime_type: {
            type: DataTypes.STRING,
        },
        deleted_at: {
            type: DataTypes.DATE,
            defaultValue: null
        }
    }, { sequelize, modelName: 'Uploads' });

    return model;
}