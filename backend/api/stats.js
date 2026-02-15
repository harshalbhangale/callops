// Get user stats (mock data for now)
module.exports = (req, res) => {
  // TODO: Replace with actual database queries
  const mockStats = {
    totalCalls: 24,
    activeApps: 12,
    totalDeployments: 18,
    successRate: 95
  };

  res.status(200).json(mockStats);
};
