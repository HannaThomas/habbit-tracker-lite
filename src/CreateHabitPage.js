import { useState } from 'react';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { createHabit } from './api';
import { useNavigate } from 'react-router-dom'

function CreateHabitPage({setHabits, habits, categoryOptions}) {
    const [habit, setHabit] = useState('');
    const [category, setCategory]= useState('Education')
    const navigate = useNavigate();


    const addHabit = () => {
        if (!habit.trim()) return;
        const selected=categoryOptions[category]
        const newHabit = {
            text: habit,
            icon: selected.iconName,
            category,
            checked: false
        }
        createHabit(newHabit).then((saved) => {
            setHabits([...habits, saved]);
            setHabit('');
            setCategory('Education');
            navigate('/');
        });
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Create a New Habit</h2>
            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                {Object.entries(categoryOptions).map(([cat, config]) => (
                    <MenuItem key={cat} value={cat}>{config.icon}{cat}</MenuItem>
                ))}
            </Select>
            <TextField
                placeholder="Habit Name"
                value={habit}
                onChange={(e) => setHabit(e.target.value)}
                style={{ marginTop: '10px', marginBottom: '10px', display: 'block' }}
            />
            <Button variant="contained" onClick={addHabit}>Add Habit</Button>
        </div>
    )
}

export default CreateHabitPage;