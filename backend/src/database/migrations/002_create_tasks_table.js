module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Tasks", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        status: {
          type: Sequelize.ENUM("todo", "in_progress", "completed"),
          defaultValue: "todo",
        },
        priority: {
          type: Sequelize.ENUM("low", "medium", "high"),
          defaultValue: "medium",
        },
        assignee: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        dueDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      });
    },
  
    down: async (queryInterface) => {
      await queryInterface.dropTable("Tasks");
    },
  };