module.exports = {
	...require('./auth'),
	...require('./poll')
};

module.exports.notFound = (req, res, next) => {
	const err = new Error('not found');
	err.Status = 404;
	next(err);
};


module.exports.errors = (err, req, res, next) => {
	res.status(err.status || 400).json({
		message: err.message || 'unexpected error happend'
    });
};