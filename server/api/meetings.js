const express = require("express");
const meetingsRouter = express.Router();
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require("../db");

meetingsRouter.get("/", (req, res, next) => {
    const allmeetings = getAllFromDatabase("meetings");
    res.send(allmeetings);
});

meetingsRouter.post("/", (req, res, next) => {
    const newmeeting = addToDatabase("meetings", createMeeting());
    res.status(201).send(newmeeting);
});

meetingsRouter.delete("/", (req, res, next) => {
    deleteAllFromDatabase("meetings");
    res.status(204).send();
});

module.exports = meetingsRouter;
