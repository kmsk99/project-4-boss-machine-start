const express = require("express");
const minionsRouter = express.Router();
const workRouter = require("./work");
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require("../db");

minionsRouter.param("minionId", (req, res, next, minionId) => {
    if (getFromDatabaseById("minions", minionId)) {
        req.minionId = minionId;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.use("/:minionId/work", workRouter);

minionsRouter.get("/", (req, res, next) => {
    const allMinions = getAllFromDatabase("minions");
    res.send(allMinions);
});

minionsRouter.post("/", (req, res, next) => {
    const newMinion = req.body;
    addToDatabase("minions", newMinion);
    res.status(201).send(newMinion);
});

minionsRouter.get("/:minionId", (req, res, next) => {
    const getMinion = getFromDatabaseById("minions", req.minionId);
    if (getMinion) {
        res.send(getMinion);
    } else {
        res.status(400).send();
    }
});

minionsRouter.put("/:minionId", (req, res, next) => {
    const minionToUpdate = req.body;
    minionToUpdate.id = req.minionId;
    const updatedMinion = updateInstanceInDatabase("minions", minionToUpdate);
    if (updatedMinion) {
        res.status(201).send(updatedMinion);
    } else {
        res.status(400).send();
    }
});

minionsRouter.delete("/:minionId", (req, res, next) => {
    const deleteState = deleteFromDatabasebyId("minions", req.minionId);
    if (deleteState) {
        res.status(204).send();
    } else {
        res.status(400).send();
    }
});

module.exports = minionsRouter;
