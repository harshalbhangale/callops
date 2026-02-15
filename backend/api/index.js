// Health check and root endpoint
module.exports = (req, res) => {
  res.status(200).json({
    message: 'Callops Backend API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString()
  });
};
