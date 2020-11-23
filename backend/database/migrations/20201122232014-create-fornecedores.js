module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('fornecedores', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING(256),
    },
    cnpj: {
      allowNull: false,
      type: Sequelize.STRING(18),
    },
    telefone: {
      allowNull: false,
      type: Sequelize.STRING(15),
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
      defaultValue: Sequelize.null,
    },
  }),
  down: queryInterface => queryInterface.dropTable('fornecedores'),
};