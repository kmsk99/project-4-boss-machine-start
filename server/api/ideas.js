const express = require("express");
const ideasRouter = express.Router();
const {
    createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase,
} = require("../db");
const checkMillionDollarIdea = require("../checkMillionDollarIdea");

ideasRouter.param("ideaId", (req, res, next, ideaId) => {
    if (getFromDatabaseById("ideas", ideaId)) {
        req.ideaId = ideaId;
        next();
    } else {
        res.status(404).send();
    }
});

ideasRouter.get("/", (req, res, next) => {
    const allideas = getAllFromDatabase("ideas");
    res.send(allideas);
});

ideasRouter.post("/", checkMillionDollarIdea, (req, res, next) => {
    const newidea = req.body;
    addToDatabase("ideas", newidea);
    res.status(201).send(newidea);
});

ideasRouter.get("/:ideaId", (req, res, next) => {
    const getidea = getFromDatabaseById("ideas", req.ideaId);
    if (getidea) {
        res.send(getidea);
    } else {
        res.status(400).send();
    }
});

ideasRouter.put("/:ideaId", checkMillionDollarIdea, (req, res, next) => {
    const ideaToUpdate = req.body;
    ideaToUpdate.id = req.ideaId;
    const updatedIdea = updateInstanceInDatabase("ideas", ideaToUpdate);
    if (updatedIdea) {
        res.status(201).send(updatedIdea);
    } else {
        res.status(400).send();
    }
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
    const deleteState = deleteFromDatabasebyId("ideas", req.ideaId);
    if (deleteState) {
        res.status(204).send();
    } else {
        res.status(400).send();
    }
});

module.exports = ideasRouter;
