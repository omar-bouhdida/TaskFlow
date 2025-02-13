const Task = require('../models/Task'); // Assuming you have a Task model

// Fetch Task Statistics
exports.getTaskStatistics = async (req, res) => {
  try {
    // Aggregate tasks by status
    const stats = await Task.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Map the results into a more readable format
    const totalTasks = stats.reduce((acc, curr) => acc + curr.count, 0);
    const completedTasks = stats.find(stat => stat._id === 'completed')?.count || 0;
    const inProgressTasks = stats.find(stat => stat._id === 'in_progress')?.count || 0;
    const pendingTasks = stats.find(stat => stat._id === 'pending')?.count || 0;

    return res.json({
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Fetch Recent Tasks
exports.getRecentTasks = async (req, res) => {
  try {
    // Fetch recent tasks with assigned users and statuses
    const recentTasks = await Task.find()
      .populate('assignedTo', 'name email') // Populate assigned user details
      .sort({ createdAt: -1 }) // Sort by most recent first
      .limit(10); // Limit to 10 recent tasks

    return res.json({ recentTasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Fetch Task Progress Data for Bar Chart
exports.getTaskProgressData = async (req, res) => {
  try {
    // Aggregate tasks by day and status
    const taskProgress = await Task.aggregate([
      {
        $group: {
          _id: { date: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, status: '$status' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          date: '$_id.date',
          status: '$_id.status',
          count: 1,
          _id: 0,
        },
      },
      {
        $sort: { date: 1 }, // Sort by date
      },
    ]);

    // Group data by day for bar chart
    const groupedData = {};
    taskProgress.forEach(item => {
      if (!groupedData[item.date]) {
        groupedData[item.date] = { date: item.date, pending: 0, in_progress: 0, completed: 0 };
      }
      groupedData[item.date][item.status] += item.count;
    });

    // Convert grouped data to an array
    const chartData = Object.values(groupedData);

    return res.json({ taskProgress: chartData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};