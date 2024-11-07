import { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton, Modal, LinearProgress} from '@mui/material';
import DesignsAxios from '../axios/DesignsAxios';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const CreateDesignForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [designImage, setDesignImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDesignImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setDesignImage(null);
    setPreview(null);
    document.getElementById('design-image-input').value = ''; // Reset the file input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('design_image', designImage);

    try {
      await DesignsAxios.post('/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      });

      // After successful upload
      setUploading(false);
      navigate('/designs', { state: { success: true } });
    } catch (error) {
      console.error("Error uploading design:", error);
      alert("Failed to upload design.");
      setUploading(false);
    }
  };

  return (
    <Box p={4} component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" mb={2}>Upload New Design</Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        margin="normal"
        required
      />

      {/* Image Upload and Preview */}
      <Box mt={2}>
        <Button variant="contained" component="label">
          Upload Design Image
          <input
            type="file"
            id="design-image-input"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>
      </Box>

      {/* Image Preview with Remove Button */}
      {preview && (
        <Box position="relative" mt={2} display="inline-block">
          <img
            src={preview}
            alt="Image Preview"
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
            onClick={handleRemoveImage}
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
          Submit Design
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
          <Typography variant="h6" mb={2}>Uploading Design...</Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ width: '100%' }} />
          <Typography variant="body2" color="textSecondary" mt={1}>{`${progress}%`}</Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateDesignForm;