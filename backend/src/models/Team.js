const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["team_member", "manager", "admin"],
      default: "team_member",
    },
    status: {
      type: String,
      enum: ["Active", "Away", "Inactive"],
      default: "Active",
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);