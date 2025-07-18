import XIcon from '@mui/icons-material/X';
import { Button, Card, Checkbox, Paper, Typography, Grid, CardContent  } from '@mui/material';
function HabitCategoryGroup({ habits, deleteHabit, onToggle, categoryOptions,handleViewNote }) {
    return (
       <Paper sx={{minHeight: '80vh', overflowY: 'auto', padding: '20px'}}>
            <Grid container spacing={3}>
            {Object.entries(categoryOptions).map(([categoryName, config]) => {
                const filteredHabits = habits.filter(h => h.category === categoryName);
                if (filteredHabits.length === 0) return null;
                return (
                    <Grid item xs={12} sm={6} md={4} key={categoryName}>

                        <Card elevation={3} style={{ borderLeft: `8px solid ${config.color}`,padding: '10px', marginBottom: '24px', height: '200px' ,minHeight:'150px', display: 'flex', flexDirection: 'column'}}>

                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {config.icon} {categoryName}
                            </Typography>
                            <CardContent sx={{ overflowY: 'auto', flexGrow: 1  }}>
                            {filteredHabits.map((hab) => (
                                <div key={hab._id}>
                                    <Checkbox
                                        checked={hab.checked}
                                        onChange={() => onToggle(hab._id)} />
                                    {hab.text}
                                    <Button onClick={() => { deleteHabit(hab._id) }}><XIcon sx={{ color: 'red' }} /></Button>
                                    {hab.note && (
                                        <Button onClick={()=>handleViewNote(hab)}>📝</Button> //
                                    )}
                                </div>
                            ))}
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
       </Paper> 
    )
}
export default HabitCategoryGroup; 