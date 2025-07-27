import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import HabitIcon from '@mui/icons-material/CheckCircle';
import { AppBar, Toolbar, Typography } from '@mui/material';

function NavBar() {
    return (
<AppBar position="static"  sx={{ backgroundColor: '#1787f7ff' }}>
  <Toolbar>
    <Button color="inherit" href="/" startIcon={<HomeIcon />}>Home</Button>
    <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontFamily: 'Roboto' }}>
      Habit Tracker Lite
    </Typography>
    <Button color="inherit" href="/habits" startIcon={<HabitIcon />}>Habits</Button>
    <Button color="inherit" href="/create" variant="outlined" sx={{ marginLeft: 2 }}>
      Create Habit
    </Button>
  </Toolbar>
</AppBar>
    );
}   
export default NavBar;
