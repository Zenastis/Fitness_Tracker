const router = require("express").Router()
const Workout = require("../models/workout.js")

router.post("/api/workouts", (req, res) => {
    Workout.create({

    })
        .then((workoutDb) => {
            res.json(workoutDb)
        })
        .catch((err) => {
            res.json(err)
        })
})

router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        { new: true, runValidators: true }
    )
        .then((workoutDb) => {
            res.json(workoutDb)
        })
        .catch((err) => {
            res.json(err)
        })
})

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            },
        },
    ])
        .then((workoutDb) => {
            res.json(workoutDb)
        })
        .catch((err) => {
            res.json(err)
        })
})

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            },
        },
    ])
        .sort({ _id: -1 })
        .limit(7)
        .then((workoutDb) => {
            res.json(workoutDb)
        })
        .catch((err) => {
            res.json(err)
        })
})

router.delete("/api/workouts", (req, res) => {
    Workout.destroy({})
    .then((workoutDb) => {
        res.json(workoutDb)
    })
    .catch((err) => {
        res.json(err)
    })
})