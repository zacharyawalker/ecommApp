import { useState } from 'react';
import { Box, Button, TextField, Modal, Typography, CircularProgress, Alert} from '@mui/material';
import MockupsAxios from '../axios/MockupsAxios'
import { useNavigate } from 'react-router-dom';

const CreateMockupLibraryForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setModalOpen(true);
  
    try {
      await MockupsAxios.post('/library/', {
        title,
        description,
        mockups: [], // Include an empty mockups array as expected by the API
      });
      
      
      // Close modal and redirect after a delay
      setTimeout(() => {
        setModalOpen(false);
        navigate('/mockups/libraries', { state: { successMessage: 'Library created successfully!' } });
      }, 2000);
    } catch (error) {
      setErrorMessage('Error creating library. Please try again.  Error' + {error});
      setModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box p={3} maxWidth="600px" sx={{ textAlign: 'left' }}> {/* Left-align form components */}
        <Typography variant="h5" mb={3}>Create New Mockup Library</Typography>
        
        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}> {/* Ensures form elements align left */}
            <TextField
            label="Title"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            />
            <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            />
            
            <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
            sx={{ mt: 2 }}
            >
            Create Library
            </Button>
        </form>

      
      {/* Error Message */}
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {/* Submission Progress Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <CircularProgress />
          <Typography variant="body1" mt={2}>
            Creating library...
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateMockupLibraryForm;