import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  CardMedia,
  Modal,
  Autocomplete,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';

const steps = ['Select Design', 'Enter Product Details', 'Choose Category'];

const ProductCreationWizard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [designQuery, setDesignQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingDesigns, setLoadingDesigns] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const designsPerPage = 5; // Number of designs per page

  // Fetch designs based on search query or load initial designs if query is empty
  const fetchDesigns = async (query = '') => {
    setLoadingDesigns(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/designs/`, {
        params: { search: query },
      });
      setDesigns(response.data);
    } catch (error) {
      console.error("Error fetching designs:", error);
    } finally {
      setLoadingDesigns(false);
    }
  };

  // Fetch categories from the specified endpoint
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/products/categories/`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchDesigns(); // Load designs on initial render
    fetchCategories(); // Load categories on initial render
  }, []);

  // Handle design search when query changes
  useEffect(() => {
    if (designQuery) {
      fetchDesigns(designQuery);
    }
  }, [designQuery]);

  const handleDesignSelect = (design) => {
    setSelectedDesign(design);
  };

  const handleNext = () => {
    if (activeStep === 0 && !selectedDesign) {
      alert("Please select a design to proceed.");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setModalOpen(true);
    try {
      const payload = {
        title,
        description,
        product_category: category || null,
        designs: selectedDesign ? selectedDesign.id : null,
        mockups: [],
        mockup_libraries: [],
      };
      await axios.post('http://localhost:8000/api/v1/products/', payload);
      alert("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsSubmitting(false);
      setModalOpen(false);
    }
  };

  // Pagination functions
  const indexOfLastDesign = currentPage * designsPerPage;
  const indexOfFirstDesign = indexOfLastDesign - designsPerPage;
  const currentDesigns = designs.slice(indexOfFirstDesign, indexOfLastDesign);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(designs.length / designsPerPage)));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={2}>Create New Product</Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Box mt={4}>
          <Autocomplete
            options={designs}
            getOptionLabel={(option) => option.title}
            onInputChange={(e, value) => setDesignQuery(value)}
            renderInput={(params) => (
              <TextField {...params} label="Search Designs" variant="outlined" fullWidth />
            )}
          />
          {loadingDesigns ? (
            <Box mt={2} display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* Design List */}
              <List>
                {currentDesigns.map((design) => (
                  <ListItem 
                    key={design.id} 
                    onClick={() => handleDesignSelect(design)} 
                    sx={{
                      display: 'flex', 
                      alignItems: 'center',
                      border: selectedDesign?.id === design.id ? '2px solid #4caf50' : '1px solid #ddd',
                      cursor: 'pointer',
                      borderRadius: 1,
                      mb: 1,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={design.design_image}
                      alt={design.title}
                      sx={{ width: '150px', height: 'auto', marginRight: 2, borderRadius: 1 }}
                    />
                    <ListItemText primary={design.title} secondary={design.description} />
                  </ListItem>
                ))}
              </List>
              
              {/* Pagination Controls */}
              <Box display="flex" justifyContent="center" mt={2}>
                <Button 
                  variant="outlined" 
                  onClick={handlePreviousPage} 
                  startIcon={<ArrowBackIcon />} 
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Typography variant="body2" sx={{ mx: 2 }}>Page {currentPage} of {Math.ceil(designs.length / designsPerPage)}</Typography>
                <Button 
                  variant="outlined" 
                  onClick={handleNextPage} 
                  endIcon={<ArrowForwardIcon />} 
                  disabled={currentPage === Math.ceil(designs.length / designsPerPage)}
                >
                  Next
                </Button>
              </Box>
            </>
          )}
        </Box>
      )}

      {activeStep === 1 && (
        <Box mt={4}>
          <TextField
            label="Product Title"
            variant="outlined"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Product Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />
        </Box>
      )}

      {activeStep === 2 && (
        <Box mt={4}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isSubmitting}>Submit</Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
        )}
      </Box>

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
          {isSubmitting ? (
            <>
              <CircularProgress />
              <Typography mt={2}>Creating product...</Typography>
            </>
          ) : (
            <Typography mt={2}>Product created successfully!</Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductCreationWizard;