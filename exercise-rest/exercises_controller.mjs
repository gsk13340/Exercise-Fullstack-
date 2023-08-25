import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.post('/exercises', asyncHandler(async (req, res) => {
    const { name, reps, weight, unit, date } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ Error: 'Invalid name value' });
    }

    if (!reps || typeof reps !== 'number' || reps <= 0) {
        return res.status(400).json({ Error: 'Invalid reps value' });
    }

    if (!weight || typeof weight !== 'number' || weight <= 0) {
        return res.status(400).json({ Error: 'Invalid weight value' });
    }

    if (!unit || typeof unit !== 'string') {
        return res.status(400).json({ Error: 'Invalid unit value' });
    }

    if (!date || !/^\d{2}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ Error: 'Invalid date value' });
    }

    exercises.createExercise(name, reps, weight, unit, date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
}));

app.get('/exercises/:_id', asyncHandler(async (req, res) => {
  const exerciseId = req.params._id; 
  exercises.findExerciseById(exerciseId)
    .then(exercise => {
        if (exercise !== null) {
            res.json(exercise);
        }else{
            res.status(404).json({Error: 'Resource not found' });
        }
        })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Request failed' });
    });
}));

app.get('/exercises', asyncHandler(async (req, res) => {
    const filter = {};
    const result = await exercises.findExercises(filter);
    res.send(result);

}));
app.put('/exercises/:_id', asyncHandler(async (req, res) => {
    const { name, reps, weight, unit, date } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ Error: 'Invalid name value' });
    }

    if (!reps || typeof reps !== 'number' || reps <= 0) {
        return res.status(400).json({ Error: 'Invalid reps value' });
    }

    if (!weight || typeof weight !== 'number' || weight <= 0) {
        return res.status(400).json({ Error: 'Invalid weight value' });
    }

    if (!unit || typeof unit !== 'string') {
        return res.status(400).json({ Error: 'Invalid unit value' });
    }

    if (!date || !/^\d{2}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ Error: 'Invalid date value' });
    }

    exercises.replaceExercise(req.params._id, name, reps, weight, unit, date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.json({ _id: req.params._id, name, reps, weight, unit, date });
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
}));

app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});