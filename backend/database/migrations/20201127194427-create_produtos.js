module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('produtos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    barcode: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    description: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deleted_at: {
      allowNull: true,
      type: Sequelize.DATE,
      defaultValue: Sequelize.null
    },
  }),
  down: queryInterface => queryInterface.dropTable('produtos'),
};