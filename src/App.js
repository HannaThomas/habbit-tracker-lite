import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import PoolIcon from '@mui/icons-material/Pool';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BookIcon from '@mui/icons-material/Book';
import XIcon from '@mui/icons-material/X';
import { useEffect, useState, useRef } from 'react';
import { Box, Button, MenuItem, Select, Checkbox } from '@mui/material';

function App() {
  const [habit, setHabit] = useState('');
  const [habitIcon, setHabitIcon] = useState(<BookIcon />);
  const [habits, setHabits] = useState([]);
  const isFirstRender = useRef(true);
  const iconMap = {
    Walk: <DirectionsWalkIcon />,
    Book: <BookIcon />,
    Swim: <PoolIcon />,
    Gaming: <SportsEsportsIcon />
  }
  const addHabit = () => {
    const newHabit = {
      id: Date.now(),
      text: habit,
      icon: habitIcon,
      checked: false
    }
    setHabits([...habits, newHabit]);
    setHabit('');
    setHabitIcon('');
  }
  const deleteHabit = (id) => {
    setHabits(habits.filter((hab) => hab.id !== id));
  }
  const onToggle = (id) => {
    setHabits(
      habits.map((hab) =>
        (hab.id === id) ? { ...hab, checked: !hab.checked } : hab
      ))
  }
  //On Mounting
  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem("habits"))
    if (savedHabits) setHabits(savedHabits);
  }, []);
  // On update
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits])
  return (
    <div>
      Choose an icon:<Select value={habitIcon} onChange={(e) => setHabitIcon(e.target.value)}>
        <MenuItem value="Book"><BookIcon /></MenuItem>
        <MenuItem value="Walk"><DirectionsWalkIcon /></MenuItem>
        <MenuItem value="Swim"><PoolIcon /></MenuItem>
        <MenuItem value="Gaming"><SportsEsportsIcon /></MenuItem>
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
