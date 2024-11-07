import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, IconButton, Select, MenuItem, FormControl, InputLabel, Modal, LinearProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateMockupForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [colorOptions, setColorOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [mockupImage, setMockupImage] = useState(null);
  const [mockupBoxImage, setMockupBoxImage] = useState(null);
  const [mockupPreview, setMockupPreview] = useState(null);
  const [boxPreview, setBoxPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchColorOptions();
    fetchCategoryOptions();
  }, []);

  const fetchColorOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/mockups/color/');
      setColorOptions(response.data);
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  const fetchCategoryOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/mockups/categories/');
      setCategoryOptions(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleImageChange = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (setImage, setPreview, inputId) => {
    setImage(null);
    setPreview(null);
    document.getElementById(inputId).value = ''; // Reset the file input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('color', selectedColor);
    formData.append('product_category', selectedCategory);
    formData.append('mockup_image', mockupImage);
    formData.append('mockup_box_image', mockupBoxImage);

    try {
      await axios.post('http://localhost:8000/api/v1/mockups/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      });

      setUploading(false);
      navigate('/mockups', { state: { success: true } });
    } catch (error) {
      console.error("Error uploading mockup:", error);
      alert("Failed to upload mockup.");
      setUploading(false);
    }
  };

  return (
    <Box p={4} component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" mb={2}>Upload New Mockup</Typography>
      
      {/* Title Input */}
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
        required
      />
      
      {/* Color Dropdown */}
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Color</InputLabel>
        <Select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          label="Color"
          required
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {colorOptions.map(color => (
            <MenuItem key={color.id} value={color.id}>{color.title}</MenuItem>
          ))}
        </Select>
      </FormControl>
      
      {/* Product Category Dropdown */}
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Product Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          label="Product Category"
          required
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {categoryOptions.map(category => (
            <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Mockup Image Upload */}
      <Box mt={2}>
        <Button variant="contained" component="label">
          Upload Mockup Image
          <input
            type="file"
            id="mockup-image-input"
            hidden
            accept="image/*"
            onChange={(e) => handleImageChange(e, setMockupImage, setMockupPreview)}
          />
        </Button>
      </Box>
      {mockupPreview && (
        <Box position="relative" mt={2} display="inline-block">
          <img
            src={mockupPreview}
            alt="Mockup Preview"
            style={{
              width: 100,
              height: 100,
              objectFit: 'cover',
              borderRadius: 8,
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}
          />
          <IconButton
            size="small"
            onClick={() => handleRemoveImage(setMockupImage, setMockupPreview, 'mockup-image-input')}
            sx={{
              position: 'absolute',
              top: -8,
              right: -8,
              backgroundColor: '#f44336',
              color: '#fff',
              '&:hover': { backgroundColor: '#d32f2f' },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {/* Mockup Box Image Upload */}
      <Box mt={2}>
        <Button variant="contained" component="label">
          Upload Mockup Box Image
          <input
            type="file"
            id="mockup-box-image-input"
            hidden
            accept="image/*"
            onChange={(e) => handleImageChange(e, setMockupBoxImage, setBoxPreview)}
          />
        </Button>
      </Box>
      {boxPreview && (
        <Box position="relative" mt={2} display="inline-block">
          <img
            src={boxPreview}
            alt="Mockup Box Preview"
            style={{
              width: 100,
              height: 100,
              objectFit: 'cover',
              borderRadius: 8,
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}
          />
          <IconButton
            size="small"
            onClick={() => handleRemoveImage(setMockupBoxImage, setBoxPreview, 'mockup-box-image-input')}
            sx={{
              position: 'absolute',
              top: -8,
              right: -8,
              backgroundColor: '#f44336',
              color: '#fff',
              '&:hover': { backgroundColor: '#d32f2f' },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {/* Submit Button */}
      <Box mt={3}>
        <Button type="submit" variant="contained" color="primary">
          Submit Mockup
        </Button>
      </Box>

      {/* Upload Progress Modal */}
      <Modal open={uploading} onClose={() => {}} disableBackdropClick>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
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
          <Typography variant="h6" mb={2}>Uploading Mockup...</Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ width: '100%' }} />
          <Typography variant="body2" color="textSecondary" mt={1}>{`${progress}%`}</Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateMockupForm;