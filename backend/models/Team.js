const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    description: {
      type: String,
      default: '',
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Members are required'],
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Created by user is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Virtual field for tasks associated with the team
teamSchema.virtual('tasks', {
  ref: 'Task', // Reference to the Task model
  localField: '_id', // Field in Team model
  foreignField: 'team', // Field in Task model
});

module.exports = mongoose.model('Team', teamSchema);