import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList'; // Make sure this is properly imported
import { useNavigate } from 'react-router-dom';

function HomePage({setExerciseToEdit}) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate(); 

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const response = await fetch('/exercises')
            const exercises = await response.json()
            setExercises(exercises);
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        navigate("/Edit");

    }

    const loadExercises = async () => {
        try {
            const response = await fetch('/exercises');
            const data = await response.json();
            setExercises(data);
        } catch (error) {
            console.error('Error fetching exercises:', error);
        }
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2>List of Exercises</h2>
            {/* Rendering ExerciseList or other components here */}
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
            <Link to="/create">Add an exercise</Link>
            </>
            );
}

export default HomePage;
    
