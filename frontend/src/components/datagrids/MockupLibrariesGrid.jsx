import { useState, useEffect } from 'react'
import MockupsAxios from '../axios/MockupsAxios'
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Box, Typography, Tooltip, Button, Alert, Slide, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useLocation } from 'react-router-dom';

const MockupLibrariesGrid = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [libraries, setLibraries] = useState([]);
  const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || '');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [libraryToDelete, setLibraryToDelete] = useState(null);

  useEffect(() => {
    fetchLibraries();
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchLibraries = async () => {
    try {
      const response = await MockupsAxios.get('/library/');
      setLibraries(response.data);
    } catch (error) {
      console.error("Error fetching libraries:", error);
    }
  };

  const handleNavigateToDetails = (id) => {
    navigate(`/mockups/libraries/${id}`);
  };

  const handleOpenDeleteModal = (id) => {
    setLibraryToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setLibraryToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await MockupsAxios.delete(`/library/${libraryToDelete}/`);
      setLibraries((prevLibraries) => prevLibraries.filter((library) => library.id !== libraryToDelete));
      setSuccessMessage('Library deleted successfully.');
    } catch (error) {
      console.error("Error deleting library:", error);
    } finally {
      handleCloseDeleteModal();
    }
  };

  const columns = [
    {
      field: 'title',
      headerName: 'Library Title',
      width: 300,
      renderCell: (params) => (
        <Typography
          style={{ cursor: 'pointer', color: '#1e88e5' }}
          onClick={() => handleNavigateToDetails(params.row.id)}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 400,
      renderCell: (params) => (
        <Tooltip title={params.value} placement="top-start">
          <Typography
            variant="body2"
            noWrap
            style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleNavigateToDetails(params.row.id)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleOpenDeleteModal(params.row.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const rows = libraries.map((library) => ({
    id: library.id,
    title: library.title,
    description: library.description,
  }));

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom>Mockup Libraries</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/mockups/libraries/new')}
        >
          Create New Library
        </Button>
      </Box>

      {/* Success Banner */}
      {successMessage && (
        <Slide in={!!successMessage} direction="down" mountOnEnter unmountOnExit>
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        </Slide>
      )}

      <Box height={400}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
        />
      </Box>

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModalOpen} onClose={handleCloseDeleteModal}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this mockup library? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MockupLibrariesGrid; 