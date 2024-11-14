


import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Typography,
    CardMedia,
    IconButton,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Switch,
    FormControlLabel,
    Grid,
    Modal,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
  } from '@mui/material';


const DialogSand = () => {

    const [TestDialogOpen, setTestDialogOpen] = useState(true);

    return (
        
        <Dialog open={TestDialogOpen} onClose={() => setTestDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Test Dialog</DialogTitle>
        <DialogContent>
            <Typography>Are you sure you want to delete this mockup?</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setTestDialogOpen(false)} color="primary">No</Button> 
        </DialogActions>
      </Dialog>
    )

}

export default DialogSand;