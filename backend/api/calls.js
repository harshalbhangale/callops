// Get all calls (mock data for now)
module.exports = (req, res) => {
  // TODO: Replace with actual database queries
  const mockCalls = [
    {
      id: '1',
      phoneNumber: '+1234567890',
      transcription: 'Build a todo app with React',
      status: 'completed',
      appUrl: 'https://todo-app-xyz.vercel.app',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: '2',
      phoneNumber: '+1234567890',
      transcription: 'Create a weather dashboard',
      status: 'building',
      createdAt: new Date(Date.now() - 3600000).toISOString()
    }
  ];

  res.status(200).json(mockCalls);
};
