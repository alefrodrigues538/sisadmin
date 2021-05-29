'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('uploads', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    owner_id: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    size: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    mime_type: {
      allowNull: false,
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
  down: queryInterface => queryInterface.dropTable('uploads'),
};
