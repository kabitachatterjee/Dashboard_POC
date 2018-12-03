module.exports = {
	origin: process.env.ORIGIN || `http://localhost:${exports.port}`,
	port: process.env.PORT || 3001,
	projectId: process.env.PROJECT_ID,
};

