module.exports = {
	...require('./auth')
};

module.exports.notFound = (req, res, next) => {
	const err = new Error('not found');
	err.Status = 404;
	next(err);
};


module.exports.errors = (err, req, res, next) => {
	res.status(err.status || 400).json({
		err: err.message || 'oops ca va pas || NOT FOUND'
    });
};