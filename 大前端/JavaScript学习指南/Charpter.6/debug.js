let lastMessage;

module.exports = (prefix) => {
	return (message) => {
		const now = Date.now();
		const sinceLastMessage = now - (lastMessage || now);
		console.log(`${prefix} ${message} + ${sinceLastMessage}ms`);
		lastMessage = now;
	};
};