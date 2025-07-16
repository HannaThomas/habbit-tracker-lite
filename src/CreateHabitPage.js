import { useState } from 'react';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { createHabit } from './api';
import { useNavigate } from 'react-router-dom'


function CreateHabitPage({setHabits, habits, iconMap}) {
    const [habit, setHabit] = useState('');
    const [habitIcon, setHabitIcon] = useState("Book");
    const navigate = useNavigate();


    const addHabit = () => {
        if (!habit.trim()) return;
        const newHabit = {
            text: habit,
            icon: habitIcon,
            checked: false
        }
        createHabit(newHabit).then((saved) => {
            setHabits([...habits, saved]);
            setHabit('');
            setHabitIcon('Book');
            navigate('/');
        });
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Create a New Habit</h2>
            <Select value={habitIcon} onChange={(e) => setHabitIcon(e.target.value)}>
                {Object.entries(iconMap).map(([key, icon]) => (
                    <MenuItem key={key} value={key}>{icon}</MenuItem>
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