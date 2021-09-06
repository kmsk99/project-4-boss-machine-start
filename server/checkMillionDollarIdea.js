const checkMillionDollarIdea = (req, res, next) => {
    const weeklyRevenue = req.body.weeklyRevenue;
    const numWeeks = req.body.numWeeks;
    if (
        Number(numWeeks) * Number(weeklyRevenue) < 1000000 ||
        !Number(numWeeks) ||
        !Number(weeklyRevenue) ||
        !numWeeks ||
        !weeklyRevenue
    ) {
        res.status(400).send("node");
    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
