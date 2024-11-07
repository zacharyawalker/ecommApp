import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, CircularProgress, TextField, Button, Grid, Chip, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DesignDetails = () => {
  const { design_id } = useParams();
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchDesignDetails();
  }, []);

  const fetchDesignDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/designs/${design_id}`);
      setDesign(response.data);
      setFormData({ title: response.data.title, description: response.data.description });
      setLoading(false);
    } catch (error) {
      setError("Could not fetch design details. Error: " + error);
      setLoading(false);
    }
  };

  const handleEditClick = () => setEditMode(true);
  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:8000/api/v1/designs/${design_id}`, formData);
      setDesign({ ...design, ...formData });
      setEditMode(false);
    } catch (error) {
      setError("Failed to save changes Error: " + error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case 'New':
  //       return 'orange';
  //     case 'In Progress':
  //       return 'blue';
  //     case 'Published':
  //       return 'green';
  //     case 'Retired':
  //       return 'black';
  //     default:
  //       return 'gray';
  //   }
  // };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box p={4}>
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/designs')}
        sx={{ mb: 3 }}
      >
        Back to Designs
      </Button>
      <Grid container spacing={4}>
        {/* Left Column: Design Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={design.design_image}
            alt="Design"
            sx={{
              width: '80%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: 2,
            }}
          />
          {/* Created Date and Status Badge - Single Line */}
          <Box
            mt={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width = '80%'
          >
            <Typography variant="body2" color="textSecondary">
              Created on: {new Date(design.created_on).toLocaleDateString()}
            </Typography>
            {/* <Chip
              label={design.status}
              sx={{
                color: '#fff',
                backgroundColor: getStatusColor(design.status),
                fontWeight: 'bold',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
              }}
            /> */}
          </Box>
        </Grid>

        {/* Right Column: Design Details */}
        <Grid item xs={12} md={6}>
          {editMode ? (
            <Box>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
              />
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleSaveClick}>
                  Save
                </Button>
                <Button variant="outlined" onClick={() => setEditMode(false)} sx={{ ml: 2 }}>
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold">
                {design.title}
              </Typography>
              <Typography variant="body1" mt={2} color="textSecondary" fontSize="1.1rem">
                {design.description}
              </Typography>
              <Box mt={4}>
                <Button variant="contained" onClick={handleEditClick}>
                  Edit
                </Button>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DesignDetails;