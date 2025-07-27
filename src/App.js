import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BookIcon from '@mui/icons-material/Book';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import DevicesIcon from '@mui/icons-material/Devices';
import MessageIcon from '@mui/icons-material/Message';
import { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import {
  getHabits,
  deleteHabitById,
  toggleHabitById,
  updateHabitNote
} from './api';
import './App.css';
import CreateHabitPage from './CreateHabitPage';
import HabitCategoryGroup from './HabitCategoryGroup';
import NavBar from './NavBar';
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
  const [selectedHabit, setSelectedHabit] = useState({});
  const [noteText, setNoteText] = useState('');
  const [open, setOpen] = useState(false);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);

  //On Mounting
  useEffect(() => {
    getHabits().then(setHabits).catch(console.error);
  }, []);

  const deleteHabit = (id) => {
    deleteHabitById(id).then(() => {
      setHabits(habits.filter((hab) => hab._id !== id));
    })
  }
  const onToggle = (id, currentChecked) => {
    const updatedChecked = !currentChecked;
    toggleHabitById(id, updatedChecked).then((updated) => {
      setHabits(
        habits.map((hab) =>
          (hab._id === id) ? updated : hab
        ))
    })
  }
  const handleViewNote = (habit) => {
    setSelectedNote(habit);
    setOpen(true);
  }

  const handleAddNote = (habit) => {
    setSelectedHabit(habit);
    setNoteText(habit.note || '');
    setNoteDialogOpen(true);
  }
  return (
    <div className='app-background'>
      <NavBar />
      <Router>
        <Routes>
          <Route path='/' element={
            <Box
              sx={{
                background: 'linear-gradient(to right, #e95499, #4febf7)',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                textAlign: 'center',
                padding: '2rem'
              }}
            >
              <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to Habit Tracker Lite</h1>
              <Typography variant="h6" sx={{ maxWidth: '600px', marginBottom: '2rem' }}>
                Build better habits with colorful organization and real-time progress. Start tracking what matters most to you.
              </Typography>
              <Button variant="contained" color="secondary" href="/create">
                Get Started
              </Button>
            </Box>
          } />

          <Route path='/habits' element={
            <Box>
              <HabitCategoryGroup habits={habits} deleteHabit={deleteHabit} onToggle={onToggle} categoryOptions={categoryOptions} handleViewNote={handleViewNote} handleAddNote={handleAddNote} />
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
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => {
            setOpen(false);
            handleAddNote(selectedNote);
          }}>Edit</Button>

        </DialogActions>
      </Dialog>
      <Dialog open={noteDialogOpen} onClose={() => { setNoteDialogOpen(false) }}>
        <DialogTitle>Add Note</DialogTitle>
        <DialogContent>
          <TextField value={noteText} onChange={(e) => setNoteText(e.target.value)} fullWidth
            multiline
            placeholder="Write your habit note..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNoteDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => {
            updateHabitNote(selectedHabit._id, noteText).then((updated) => {
              setHabits(habits.map((h) => h._id === selectedHabit._id ? updated : h));
              setNoteDialogOpen(false);
            })
          }}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
