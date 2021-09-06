const express = require("express");
const workRouter = express.Router();
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require("../db");

workRouter.param("workId", (req, res, next, workId) => {
    if (getFromDatabaseById("work", workId)) {
        req.workId = workId;
        next();
    } else {
        res.status(404).send();
    }
});

workRouter.get("/", (req, res, next) => {
    const allWorks = getAllFromDatabase("work");
    const specificWorks = allWorks.filter(
        (work) => work.minionId === req.minionId
    );
    res.send(specificWorks);
});

workRouter.post("/", (req, res, next) => {
    const newWork = req.body;
    newWork.minionId = req.minionId;
    addToDatabase("work", newWork);
    res.status(201).send(newWork);
});

workRouter.put("/:workId", (req, res, next) => {
    try {
        const workToUpdate = req.body;
        workToUpdate.id = req.workId;
        const updatedWork = updateInstanceInDatabase("work", workToUpdate);
        if (updatedWork) {
            res.status(201).send(updatedWork);
        } else {
            res.status(400).send();
        }
    } catch (error) {
        res.status(400).send();
    }
});

workRouter.delete("/:workId", (req, res, next) => {
    const deleteState = deleteFromDatabasebyId("work", req.workId);
    if (deleteState) {
        res.status(204).send();
    } else {
        res.status(400).send();
    }
});

module.exports = workRouter;
