// Get all apps (mock data for now)
module.exports = (req, res) => {
  // TODO: Replace with actual database queries
  const mockApps = [
    {
      id: '1',
      name: 'Todo App',
      description: 'A simple todo list application',
      url: 'https://todo-app-xyz.vercel.app',
      status: 'deployed',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: '2',
      name: 'Weather Dashboard',
      description: 'Real-time weather information',
      status: 'building',
      createdAt: new Date(Date.now() - 3600000).toISOString()
    }
  ];

  res.status(200).json(mockApps);
};
