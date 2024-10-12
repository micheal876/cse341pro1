const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send('You must log in to access this route.');
};

module.exports = isAuthenticated;
