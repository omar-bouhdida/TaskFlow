module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Teams", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        role: {
          type: Sequelize.ENUM("team_member", "manager", "admin"),
          defaultValue: "team_member",
        },
        status: {
          type: Sequelize.ENUM("Active", "Away", "Inactive"),
          defaultValue: "Active",
        },
        tasks: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      });
    },
  
    down: async (queryInterface) => {
      await queryInterface.dropTable("Teams");
    },
  };