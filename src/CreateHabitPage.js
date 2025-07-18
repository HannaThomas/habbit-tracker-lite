import { useState } from 'react';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { createHabit } from './api';
import { useNavigate } from 'react-router-dom'

function CreateHabitPage({setHabits, habits, categoryOptions}) {
    const [habit, setHabit] = useState('');
    const [category, setCategory]= useState('Education');
    const [habitNote,setHabitNote]=useState('');
    const navigate = useNavigate();


    const addHabit = () => {
        if (!habit.trim()) return;
        const newHabit = {
            text: habit,
            category,
            checked: false,
            note:habitNote
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
             <TextField
                placeholder="You can add notes here"
                value={habitNote}
                onChange={(e) => setHabitNote(e.target.value)}
                style={{ marginTop: '10px', marginBottom: '10px', display: 'block' }}
            />
            <Button variant="contained" onClick={addHabit}>Add Habit</Button>
        </div>
    )
}

export default CreateHabitPage;