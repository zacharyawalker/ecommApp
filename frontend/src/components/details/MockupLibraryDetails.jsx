import { useState, useEffect } from 'react';
import MockupsAxios from '../axios/MockupsAxios';
import { Box, Card, CardContent, CardMedia, Typography, Divider, Chip, IconButton, Modal, Button, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useParams, useNavigate } from 'react-router-dom';

const MockupLibraryDetails = () => {
  const { libraryId } = useParams();
  const navigate = useNavigate();
  const [library, setLibrary] = useState(null);
  const [selectedMockupId, setSelectedMockupId] = useState(null);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const [errorMessageOpen, setErrorMessageOpen] = useState(false);

  useEffect(() => {
    fetchLibrary();
  }, []);

  const fetchLibrary = async () => {
    try {
      const response = await MockupsAxios.get(`/library/${libraryId}/`);
      setLibrary(response.data);
    } catch (error) {
      console.error("Error fetching library:", error);
    }
  };

  const handleRemoveClick = (mockupId) => {
    setSelectedMockupId(mockupId);
    setConfirmationModalOpen(true);
  };

  const handleConfirmRemove = async () => {
    try {
      await MockupsAxios.post(`/library/${libraryId}/remove_mockup/`, {
        mockup_id: selectedMockupId,
      });

      setLibrary((prevLibrary) => ({
        ...prevLibrary,
        mockups: prevLibrary.mockups.filter((mockup) => mockup.id !== selectedMockupId),
      }));

      setConfirmationModalOpen(false);
      setSuccessMessageOpen(true);
    } catch (error) {
      console.error("Error removing mockup from library:", error);
      setErrorMessageOpen(true);
    }
  };

  return (
    <Box p={4}>
      {/* Back Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/mockups/libraries')}
        sx={{ mb: 2 }}
      >
        Back to Mockup Libraries
      </Button>

      <Typography variant="h4" gutterBottom>{library ? library.title : "Loading..."}</Typography>
      
      <Box display="flex" flexWrap="wrap" gap={2}>
        {library && library.mockups.map((mockup) => (
          <Card key={mockup.id} sx={{ width: 300, border: '1px solid #ddd', borderRadius: 2, boxShadow: 1, position: 'relative' }}>
            <IconButton
              size="small"
              onClick={() => handleRemoveClick(mockup.id)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: '#f44336',
                color: '#fff',
                '&:hover': { backgroundColor: '#d32f2f' },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
            <CardMedia
              component="img"
              height="200"
              image={mockup.mockup_image}
              alt={mockup.title}
              sx={{ width: 300, objectFit: 'cover' }}
            />
            <Divider />
            <CardContent>
              <Typography variant="h6" component="div" fontWeight="bold">
                {mockup.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Gender: {mockup.gender}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Category: {mockup.product_category ? mockup.product_category.title : 'N/A'}
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <Typography variant="body2" color="textSecondary" mr={1}>
                  Color:
                </Typography>
                {mockup.color ? (
                  <Chip
                    label={mockup.color.title}
                    sx={{
                      backgroundColor: `#${mockup.color.hex_code}`,
                      color: '#fff',
                      fontWeight: 'bold',
                    }}
                  />
                ) : (
                  <Typography variant="body2" color="textSecondary">N/A</Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Confirmation Modal for Removal */}
      <Modal open={confirmationModalOpen} onClose={() => setConfirmationModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            borderRadius: 2,
            p: 3,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" mb={2}>
            Are you sure you want to remove this mockup from the library?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmRemove}
            sx={{ mt: 2, width: '100%' }}
          >
            Yes, Remove
          </Button>
          <Button
            variant="outlined"
            onClick={() => setConfirmationModalOpen(false)}
            sx={{ mt: 2, width: '100%' }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>

      {/* Success Snackbar */}
      <Snackbar
        open={successMessageOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessMessageOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessMessageOpen(false)} severity="success">
          Mockup removed from library successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={errorMessageOpen}
        autoHideDuration={3000}
        onClose={() => setErrorMessageOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setErrorMessageOpen(false)} severity="error">
          There was an error removing the mockup from the library.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MockupLibraryDetails;