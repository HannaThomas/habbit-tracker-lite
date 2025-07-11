import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import PoolIcon from '@mui/icons-material/Pool';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BookIcon from '@mui/icons-material/Book';
import XIcon from '@mui/icons-material/X';
import { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Select, Checkbox } from '@mui/material';
import {
  getHabits,
  createHabit,
  deleteHabitById,
  toggleHabitById
} from './api';

const iconMap = {
  Walk: <DirectionsWalkIcon />,
  Book: <BookIcon />,
  Swim: <PoolIcon />,
  Gaming: <SportsEsportsIcon />
}

function App() {
  const [habit, setHabit] = useState('');
  const [habitIcon, setHabitIcon] = useState("Book");
  const [habits, setHabits] = useState([]);

  //On Mounting
  useEffect(() => {
    getHabits().then(setHabits).catch(console.error);
  }, []);

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
    });
  }
  const deleteHabit = (id) => {
    deleteHabitById(id).then(() => {
      setHabits(habits.filter((hab) => hab.id !== id));
    })
  }
  const onToggle = (id) => {
    toggleHabitById(id).then(() => {
      setHabits(
        habits.map((hab) =>
          (hab.id === id) ? { ...hab, checked: !hab.checked } : hab
        ))
    })
  }

  return (
    <div>
      Choose an icon:<Select value={habitIcon} onChange={(e) => setHabitIcon(e.target.value)}>
        {Object.entries(iconMap).map(([key, iconComponent]) => (
          <MenuItem key={key} value={key}>
            {iconComponent} {/* shows the actual icon in the dropdown */}
          </MenuItem>
        ))}
      </Select>

      <input placeholder='Add a habit' value={habit} onChange={(e) => setHabit(e.target.value)} />
      <Button variant="contained"
        onClick={addHabit}>ADD</Button>
      <Box>
        <h1>Habit Tracker Lite</h1>
        {habits.map((hab) => (
          <div key={hab.id}>
            <Checkbox
              checked={hab.checked}
              onChange={() => onToggle(hab.id)} />
            {hab.text}{iconMap[hab.icon]}
            <Button onClick={() => { deleteHabit(hab.id) }}><XIcon sx={{ color: 'red' }} /></Button>
          </div>
        ))}
      </Box>
    </div>
  );
}

export default App;
