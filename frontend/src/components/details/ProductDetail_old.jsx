import { useState, useEffect } from 'react';
import axios from 'axios';
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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [mockupsDialogOpen, setMockupsDialogOpen] = useState(false);
  const [librariesDialogOpen, setLibrariesDialogOpen] = useState(false);
  const [mockups, setMockups] = useState([]);
  const [mockupLibraries, setMockupLibraries] = useState([]);
  const [showMyMockups, setShowMyMockups] = useState(true);
  const [selectedMockup, setSelectedMockup] = useState(null);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await axios.get(`http://localhost:8000/api/v1/products/${productId}`);
        setProduct(productResponse.data);

        if (productResponse.data.product_images.length > 0) {
          setMainImage(productResponse.data.product_images[0].image_path);
        } else if (productResponse.data.library_product_images.length > 0) {
          setMainImage(productResponse.data.library_product_images[0].image_path);
        }

        if (productResponse.data.designs) {
          const designResponse = await axios.get(`http://localhost:8000/api/v1/designs/${productResponse.data.designs}`);
          setDesign(designResponse.data);

          if (!productResponse.data.product_images.length && !productResponse.data.library_product_images.length) {
            setMainImage(designResponse.data.design_image);
          }
        }
      } catch (error) {
        console.error("Error fetching product or design:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const fetchMockups = async (type) => {
    try {
      let response;
      if (type === "My Mockups") {
        response = await axios.get(`http://localhost:8000/api/v1/mockups/library/`);
        const myMockupsLibrary = response.data.find(library => library.title === "My Mockups");
        setMockups(myMockupsLibrary ? myMockupsLibrary.mockups : []);
      } else {
        response = await axios.get(`http://localhost:8000/api/v1/mockups/`);
        setMockups(response.data);
      }
    } catch (error) {
      console.error("Error fetching mockups:", error);
    }
  };

  const fetchMockupLibraries = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/mockups/library/`);
      setMockupLibraries(response.data.filter(library => library.title !== "My Mockups"));
    } catch (error) {
      console.error("Error fetching libraries:", error);
    }
  };

  const handleMockupsDialogOpen = () => {
    setMockupsDialogOpen(true);
    fetchMockups("My Mockups");
  };
  const handleMockupsDialogClose = () => setMockupsDialogOpen(false);

  const handleLibrariesDialogOpen = () => {
    setLibrariesDialogOpen(true);
    fetchMockupLibraries();
  };
  const handleLibrariesDialogClose = () => setLibrariesDialogOpen(false);

  const handleToggleChange = (event) => {
    setShowMyMockups(event.target.checked);
    fetchMockups(event.target.checked ? "My Mockups" : "All Mockups");
  };

  const handleThumbnailClick = (imagePath) => setMainImage(imagePath);

  const handleDialogThumbnailClick = (mockup) => {
    setSelectedMockup(mockup);
    setConfirmationOpen(true);
  };
  const handleLibraryClick = (library) => {
    setSelectedLibrary(library);
    setConfirmationOpen(true);
  };

  const handleAddConfirm = async () => {
    try {
      setLoadingAdd(true);
      setConfirmationOpen(false);
      setMockupsDialogOpen(false);
      setLibrariesDialogOpen(false);

      if (selectedMockup) {
        await axios.patch(`http://localhost:8000/api/v1/products/${productId}/add_mockups/`, {
          mockups: [selectedMockup.id],
        });
      } else if (selectedLibrary) {
        await axios.patch(`http://localhost:8000/api/v1/products/${productId}/add_mockup_library/`, {
          libraries: [selectedLibrary.id],
        });
      }

      window.location.reload();
    } catch (error) {
      console.error("Error adding to product:", error);
    } finally {
      setLoadingAdd(false);
    }
  };

  const handleRemoveMockup = (mockup) => {
    setSelectedMockup(mockup);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedMockup) {
      setDeleteInProgress(true);
      try {
        await axios.patch(`http://localhost:8000/api/v1/products/${productId}/remove_mockups/`, {
          mockups: [selectedMockup.mockup],
        });
        window.location.reload();
      } catch (error) {
        console.error("Error removing mockup:", error);
      } finally {
        setDeleteInProgress(false);
        setDeleteDialogOpen(false);
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!product) {
    return <Typography variant="h6">Product not found.</Typography>;
  }

  return (
    <Box p={3} display="flex" gap={3} alignItems="flex-start">
      <Box flex="0 0 400px" display="flex" flexDirection="column" alignItems="flex-start">
        <Button variant="outlined" onClick={() => navigate('/products')} sx={{ alignSelf: 'flex-start', mb: 2 }}>
          Back to Products
        </Button>

        <Box sx={{ width: '100%', mb: 2, display: 'flex', justifyContent: 'center' }}>
          {mainImage ? (
            <CardMedia component="img" image={mainImage} alt="Main Product Image" sx={{ width: '100%', maxWidth: '400px', borderRadius: 2 }} />
          ) : (
            <Typography variant="body2">No main image available</Typography>
          )}
        </Box>
        
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h6" gutterBottom>Single Mockup Images</Typography>
          <IconButton color="primary" onClick={handleMockupsDialogOpen} sx={{ ml: 1 }}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          {product.product_images.length > 0 ? (
            product.product_images.map((image) => (
              <Box key={image.id} sx={{ position: 'relative', textAlign: 'center' }}>
                <Box onClick={() => handleThumbnailClick(image.image_path)} sx={{
                    cursor: 'pointer',
                    border: mainImage === image.image_path ? '2px solid #1976d2' : '2px solid transparent',
                    borderRadius: 2,
                    width: '100px',
                    height: '150px',
                    overflow: 'hidden',
                    mb: 1
                  }}
                >
                  <CardMedia component="img" image={image.image_path} alt={`Mockup ${image.id}`} sx={{ width: '100%', height: 'auto' }} />
                </Box>
                <IconButton color="error" onClick={() => handleRemoveMockup(image)} sx={{
                    position: 'absolute',
                    bottom: '5px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                ><Typography>Delete</Typography>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No mockup images available. Use the "+" icon to add new mockups.
            </Typography>
          )}
        </Box>

        {/* Library Product Images Section */}
        <Box display="flex" alignItems="center" mb={2} mt={2}>
          <Typography variant="h6" gutterBottom>Library Product Images</Typography>
          <IconButton color="primary" onClick={handleLibrariesDialogOpen} sx={{ ml: 1 }}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>
        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          flexWrap: 'wrap', 
          justifyContent: 'flex-start', 
          alignItems: 'flex-start',
          border: '1px solid #000',
          borderRadius: 2,        }}>
          {product.library_product_images.map((image) => (
            
            <Box key={image.id} onClick={() => handleThumbnailClick(image.image_path)} sx={{
                cursor: 'pointer',
                border: mainImage === image.image_path ? '2px solid #1976d2' : '2px solid transparent',
                borderRadius: 2,
                width: '100px',
                height: 'auto',
                overflow: 'hidden'
              }}
            >
              <CardMedia component="img" image={image.image_path} alt={`Library Product Image ${image.id}`} sx={{ width: '100%', height: 'auto' }} />
            </Box>
          ))}
        </Box>
      </Box>

      <Box flex="1" mt={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>{product.title}</Typography>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          Category: {product.product_category?.title || 'N/A'}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          Status: {product.status}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          Created on: {new Date(product.created_on).toLocaleDateString()}
        </Typography>

        <Typography variant="body1" mt={2}>
          {product.description}
        </Typography>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          {deleteInProgress ? (
            <Box display="flex" flexDirection="column" alignItems="center" p={2}>
              <CircularProgress />
              <Typography variant="body2" mt={2}>Deleting mockup...</Typography>
            </Box>
          ) : (
            <>
              {selectedMockup && (
                <Box display="flex" justifyContent="center" mb={2}>
                  <CardMedia component="img" image={selectedMockup.image_path} alt="Selected Mockup" sx={{ maxWidth: '100%', height: 'auto', borderRadius: 2 }} />
                </Box>
              )}
              <Typography>Are you sure you want to delete this mockup?</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!deleteInProgress && (
            <>
              <Button onClick={() => setDeleteDialogOpen(false)} color="primary">No</Button>
              <Button onClick={handleDeleteConfirm} color="error">Yes, Delete</Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Dialog for Adding Mockups */}
      <Dialog open={mockupsDialogOpen} onClose={handleMockupsDialogClose} fullWidth maxWidth="md">
        <DialogTitle>Add a Mockup</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={<Switch checked={showMyMockups} onChange={handleToggleChange} />}
            label={showMyMockups ? 'My Mockups' : 'All Mockups'}
          />
          <Grid container spacing={2}>
            {mockups.map((mockup) => (
              <Grid item xs={3} key={mockup.id}>
                <Box onClick={() => handleDialogThumbnailClick(mockup)} sx={{
                    cursor: 'pointer',
                    padding: '5px',
                    borderRadius: 2,
                    border: mainImage === mockup.mockup_image ? '2px solid #1976d2' : '2px solid transparent',
                  }}
                >
                  <CardMedia component="img" image={mockup.mockup_image} alt={mockup.title} sx={{ width: '100%', height: 'auto' }} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMockupsDialogClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Adding Library */}
      <Dialog open={librariesDialogOpen} onClose={handleLibrariesDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Select a Mockup Library</DialogTitle>
        <DialogContent>
          <List>
            {mockupLibraries.map((library) => (
              <ListItem key={library.id} disablePadding>
                <ListItemButton onClick={() => handleLibraryClick(library)}>
                  <ListItemText primary={library.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLibrariesDialogClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Modal */}
      <Modal open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            {selectedMockup
              ? 'Add this Mockup to this Product?'
              : `Add this Library (${selectedLibrary?.title}) to this Product?`}
          </Typography>
          <Button variant="contained" color="primary" fullWidth onClick={handleAddConfirm}>
            Yes, Add
          </Button>
        </Box>
      </Modal>

      {/* Loading Modal */}
      <Modal open={loadingAdd} onClose={() => {}} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
          }}
        >
          <CircularProgress />
          <Typography variant="body1" mt={2}>Adding to product...</Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductDetails;
