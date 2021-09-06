const express = require("express");
const apiRouter = express.Router();

const minionsRouter = require("./api/minions");
apiRouter.use("/api/minions", minionsRouter);

const ideasRouter = require("./api/ideas");
apiRouter.use("/api/ideas", ideasRouter);

const meetingsRouter = require("./api/meetings");
apiRouter.use("/api/meetings", meetingsRouter);

module.exports = apiRouter;
