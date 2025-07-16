import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BookIcon from '@mui/icons-material/Book';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import DevicesIcon from '@mui/icons-material/Devices';
import MessageIcon from '@mui/icons-material/Message';
import XIcon from '@mui/icons-material/X';
import { useEffect, useState } from 'react';
import { Box, Button,Checkbox } from '@mui/material';
import {
  getHabits,
  deleteHabitById,
  toggleHabitById
} from './api';
import './App.css';
import CreateHabitPage from './CreateHabitPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export const categoryOptions = {
  "Personal Growth": {
    icon: <DirectionsWalkIcon />,
    iconName: 'Personal'
  },
  "Health & Fitnes": {
    icon: <FitnessCenterIcon />,
    iconName: 'Health'
  },
  "Home & Environment": {
    icon: <CleaningServicesIcon />,
    iconName: 'Clean'
  },
  Education: {
    icon: <BookIcon />,
    iconName: 'Book'
  },
  "Mental Wellness": {
    icon: <SelfImprovementIcon />,
    iconName: 'Yoga'
  },
  "Work & Productivity": {
    icon: <DevicesIcon />,
    iconName: 'Work'
  },
  "Leisure and Fun": {
    icon: <SportsEsportsIcon />,
    iconName: 'Game'
  },  
  "Social & Relationship": {
    icon: <MessageIcon />,
    iconName: 'Social'
  }
}

function App() {
  const [habits, setHabits] = useState([]);

  //On Mounting
  useEffect(() => {
    getHabits().then(setHabits).catch(console.error);
  }, []);

  const deleteHabit = (id) => {
    deleteHabitById(id).then(() => {
      setHabits(habits.filter((hab) => hab._id !== id));
    })
  }
  const onToggle = (id) => {
    toggleHabitById(id).then(() => {
      setHabits(
        habits.map((hab) =>
          (hab._id === id) ? { ...hab, checked: !hab.checked } : hab
        ))
    })
  }

  return (
    <div className='app-background'>
      <Router>
        <Routes>
          <Route path='/' element={
            <Box>
              <h1>Habit Tracker Lite</h1>
              {habits.map((hab) => (
                <div key={hab._id}>
                  <Checkbox
                    checked={hab.checked}
                    onChange={() => onToggle(hab._id)} />
                  {hab.text}{categoryOptions[hab.icon]}
                  <Button onClick={() => { deleteHabit(hab._id) }}><XIcon sx={{ color: 'red' }} /></Button>
                </div>
              ))}
              <Button variant="contained" component="a" href="/create">
                Create a new Habit
              </Button>

            </Box>
          } />
          <Route path="/create" element={<CreateHabitPage setHabits={setHabits} habits={habits} categoryOptions={categoryOptions}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
