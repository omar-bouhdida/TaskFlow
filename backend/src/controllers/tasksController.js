const Task = require("../models/Task");

// Create a new task
exports.createTask = async (req, res, next) => {
  const { title, description, status, priority, assignee, dueDate } = req.body;

  try {
    // Validate dueDate format
    const parsedDueDate = new Date(dueDate);
    if (isNaN(parsedDueDate)) {
      return res.status(400).json({ error: "Invalid due date format." });
    }

    // Create a new task
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      assignee,
      dueDate: parsedDueDate,
    });

    await newTask.save();
    res.status(201).json({ message: "Task created successfully.", task: newTask });
  } catch (error) {
    next(error);
  }
};

// Get a specific task by ID
exports.getTaskById = async (req, res, next) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId).populate("assignee");
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
    res.status(200).json({ task });
  } catch (error) {
    next(error);
  }
};

// Add a comment to a task
exports.addCommentToTask = async (req, res, next) => {
  const { taskId } = req.params;
  const { user, content } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }

    task.comments.push({ user, content });
    await task.save();

    res.status(200).json({ message: "Comment added successfully.", task });
  } catch (error) {
    next(error);
  }
};

// Update task details (status, due date, etc.)
exports.updateTask = async (req, res, next) => {
  const { taskId } = req.params;
  const { status, dueDate } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }

    if (status) task.status = status;
    if (dueDate) task.dueDate = new Date(dueDate);

    await task.save();
    res.status(200).json({ message: "Task updated successfully.", task });
  } catch (error) {
    next(error);
  }
};

// Get all tasks
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate("assignee", "name email avatar"); // Populate assignee with user details
    res.status(200).json({ tasks });
  } catch (error) {
    next(error);
  }
};

// Get recent tasks
exports.getRecentTasks = async (req, res, next) => {
  try {
    // Fetch the most recent tasks (e.g., last 5 tasks sorted by creation date)
    const recentTasks = await Task.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(5); // Limit to 5 tasks

    res.status(200).json({ tasks: recentTasks });
  } catch (error) {
    next(error);
  }
};


// Get task statistics grouped by day and status
exports.getTaskStats = async (req, res, next) => {
  try {
    // Aggregate tasks by day and status
    const stats = await Task.aggregate([
      {
        $group: {
          _id: { day: { $dateToString: { format: "%A", date: "$createdAt" } }, status: "$status" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.day",
          completed: { $sum: { $cond: [{ $eq: ["$_id.status", "completed"] }, "$count", 0] } },
          pending: { $sum: { $cond: [{ $ne: ["$_id.status", "completed"] }, "$count", 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          completed: 1,
          pending: 1,
        },
      },
      {
        $sort: { name: 1 }, // Sort by day of the week
      },
    ]);

    res.status(200).json({ stats });
  } catch (error) {
    next(error);
  }
};

// Get task statistics
exports.getTaskStatistics = async (req, res, next) => {
  try {
    // Aggregate task counts by status
    const stats = await Task.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: { $toUpper: "$_id" }, // Convert status to uppercase for display
          value: "$count",
        },
      },
    ]);

    // Add missing statuses with count 0
    const allStatuses = ["TOTAL TASKS", "COMPLETED", "IN PROGRESS", "CANCELLED"];
    const result = allStatuses.map((status) => {
      const stat = stats.find((s) => s.name === status.toUpperCase());
      return {
        name: status,
        value: stat ? stat.value.toString() : "0",
      };
    });

    // Calculate total tasks
    const totalTasks = result.reduce((sum, stat) => sum + parseInt(stat.value, 10), 0);
    result[0].value = totalTasks.toString();

    res.status(200).json({ stats: result });
  } catch (error) {
    next(error);
  }
};