import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BookIcon from '@mui/icons-material/Book';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import DevicesIcon from '@mui/icons-material/Devices';
import MessageIcon from '@mui/icons-material/Message';
import { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle,Typography } from '@mui/material';
import {
  getHabits,
  deleteHabitById,
  toggleHabitById
} from './api';
import './App.css';
import CreateHabitPage from './CreateHabitPage';
import HabitCategoryGroup from './HabitCategoryGroup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export const categoryOptions = {
  "Personal Growth": {
    icon: <DirectionsWalkIcon />,
    iconName: 'Personal',
    color: '#ffb74d'
  },
  "Health & Fitnes": {
    icon: <FitnessCenterIcon />,
    iconName: 'Health',
    color: '#81c784'

  },
  "Home & Environment": {
    icon: <CleaningServicesIcon />,
    iconName: 'Clean',
    color: '#3caf50'

  },
  Education: {
    icon: <BookIcon />,
    iconName: 'Book',
    color: '#64b5f6'

  },
  "Mental Wellness": {
    icon: <SelfImprovementIcon />,
    iconName: 'Yoga',
    color: '#9575cd'

  },
  "Work & Productivity": {
    icon: <DevicesIcon />,
    iconName: 'Work',
    color: '#e57373'

  },
  "Leisure and Fun": {
    icon: <SportsEsportsIcon />,
    iconName: 'Game',
    color: '#4db6ac'

  },
  "Social & Relationship": {
    icon: <MessageIcon />,
    iconName: 'Social',
    color: '#fff176'

  }
}

function App() {
  const [habits, setHabits] = useState([]);
  const [selectedNote, setSelectedNote] = useState({});
  const [open, setOpen] = useState(false);

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
  const handleViewNote = (habit) => {
    setSelectedNote({ text: habit.text, note: habit.note });
    setOpen(true);
  }

  return (
    <div className='app-background'>
      <Router>
        <Routes>
          <Route path='/' element={
            <Box>
              <h1>Habit Tracker Lite</h1>
              <HabitCategoryGroup habits={habits} deleteHabit={deleteHabit} onToggle={onToggle} categoryOptions={categoryOptions} handleViewNote={handleViewNote} />
              <Button variant="contained" component="a" href="/create">
                Create a new Habit
              </Button>

            </Box>
          } />
          <Route path="/create" element={<CreateHabitPage setHabits={setHabits} habits={habits} categoryOptions={categoryOptions} />} />
        </Routes>
      </Router>
      <Dialog open={open} onClose={() => { setOpen(false) }}>
        <DialogTitle>{selectedNote.text}</DialogTitle>
        <DialogContent>
          <Typography sx={{ whiteSpace: 'pre-wrap' }}>
            {selectedNote.note}
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
