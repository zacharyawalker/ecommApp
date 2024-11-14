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
import FileDownloadIcon from '@mui/icons-material/FileDownload'; // Import download icon


const ProductDetail = () => {
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
  const [libraryTitles, setLibraryTitles] = useState({});
  const [showMyMockups, setShowMyMockups] = useState(true);
  const [selectedMockup, setSelectedMockup] = useState(null);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const [libraryToRemove, setLibraryToRemove] = useState(null);
  const [libraryDeleteDialogOpen, setLibraryDeleteDialogOpen] = useState(false);
  const [singleDownloadDialogOpen, setSingleDownloadDialog] = useState(false);
  const [libraryDownloadDialogOpen, setLibraryDownloadDialog] = useState(false);
  const [selectedDownloadLibraryTitle, setSelectedDownloadLibraryTitle] = useState(null)


  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const productResponse = await axios.get(`http://localhost:8000/api/v1/products/${productId}`);
  //       setProduct(productResponse.data);

  //       if (productResponse.data.product_images.length > 0) {
  //         setMainImage(productResponse.data.product_images[0].image_path);
  //       } else if (productResponse.data.library_product_images.length > 0) {
  //         setMainImage(productResponse.data.library_product_images[0].image_path);
  //       }

  //       if (productResponse.data.designs) {
  //         const designResponse = await axios.get(`http://localhost:8000/api/v1/designs/${productResponse.data.designs}`);
  //         setDesign(designResponse.data);

  //         if (!productResponse.data.product_images.length && !productResponse.data.library_product_images.length) {
  //           setMainImage(designResponse.data.design_image);
  //         }
  //       }

  //       // Fetch library titles
  //       const libraryIds = [...new Set(productResponse.data.library_product_images.map(image => image.library))];
  //       const titlePromises = libraryIds.map(async (libraryId) => {
  //         const libraryResponse = await axios.get(`http://localhost:8000/api/v1/mockups/library/${libraryId}`);
  //         return { id: libraryId, title: libraryResponse.data.title };
  //       });
  //       const titles = await Promise.all(titlePromises);
  //       const titlesMap = titles.reduce((acc, library) => {
  //         acc[library.id] = library.title;
  //         return acc;
  //       }, {});
  //       setLibraryTitles(titlesMap);

  //       await fetchMockups("My Mockups");
  //       await fetchMockupLibraries();
  //     } catch (error) {
  //       console.error("Error fetching product or design:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
    
  //   fetchProduct();
  // }, [productId]);

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
  
      // Fetch library titles as before
      const libraryIds = [...new Set(productResponse.data.library_product_images.map(image => image.library))];
      const titlePromises = libraryIds.map(async (libraryId) => {
        const libraryResponse = await axios.get(`http://localhost:8000/api/v1/mockups/library/${libraryId}`);
        return { id: libraryId, title: libraryResponse.data.title };
      });
      const titles = await Promise.all(titlePromises);
      const titlesMap = titles.reduce((acc, library) => {
        acc[library.id] = library.title;
        return acc;
      }, {});
      setLibraryTitles(titlesMap);
  
    } catch (error) {
      console.error("Error fetching product or design:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  // const handleAddConfirm = async () => {
  //   try {
  //     setLoadingAdd(true);
  //     setConfirmationOpen(false);
  //     setMockupsDialogOpen(false);
  //     setLibrariesDialogOpen(false);

  //     if (selectedMockup) {
  //       await axios.patch(`http://localhost:8000/api/v1/products/${productId}/add_mockups/`, {
  //         mockups: [selectedMockup.id],
  //       });
  //     } else if (selectedLibrary) {
  //       await axios.patch(`http://localhost:8000/api/v1/products/${productId}/add_mockup_library/`, {
  //         libraries: [selectedLibrary.id],
  //       });
  //     }

  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error adding to product:", error);
  //   } finally {
  //     setLoadingAdd(false);
  //   }
  // };
  const handleAddConfirm = async () => {
    try {
      setLoadingAdd(true);
      setConfirmationOpen(false);
      setMockupsDialogOpen(false);
      setLibrariesDialogOpen(false);
  
      if (selectedMockup) {
        // API call to add a single mockup
        await axios.patch(`http://localhost:8000/api/v1/products/${productId}/add_mockups/`, {
          mockups: [selectedMockup.id],
        });
      } else if (selectedLibrary) {
        // API call to add a library
        await axios.patch(`http://localhost:8000/api/v1/products/${productId}/add_mockup_library/`, {
          libraries: [selectedLibrary.id],
        });
      }
  
      // Re-fetch the entire product to ensure all updates are reflected in the UI
      await fetchProduct();
  
      // Clear selected items
      setSelectedMockup(null);
      setSelectedLibrary(null);
    } catch (error) {
      console.error("Error adding to product:", error);
    } finally {
      setLoadingAdd(false);
    }
  };
  
  // Helper function to fetch library mockups by library ID
  const fetchLibraryMockups = async (libraryId) => {
    const response = await axios.get(`http://localhost:8000/api/v1/mockups/library/${libraryId}`);
    return response.data.mockups.map((mockup) => ({
      ...mockup,
      library: libraryId,
    }));
  };

  const handleRemoveMockup = (mockup) => {
    setSelectedMockup(mockup);
    setDeleteDialogOpen(true);
  };

  const handleRemoveLibrary = (libraryId) => {
    setLibraryToRemove(libraryId);
    setLibraryDeleteDialogOpen(true); // Open confirmation dialog
    
  };

  const confirmRemoveLibrary = async () => {
    if (libraryToRemove) {
      try {
        await axios.patch(`http://localhost:8000/api/v1/products/${productId}/remove_mockup_library/`, {
          libraries: [libraryToRemove],
        });
  
        // Update product state by filtering out the removed library mockups
        setProduct((prevProduct) => ({
          ...prevProduct,
          library_product_images: prevProduct.library_product_images.filter(
            (image) => image.library !== libraryToRemove
          ),
        }));
  
        // Optionally update library titles state to remove the library title
        setLibraryTitles((prevTitles) => {
          const updatedTitles = { ...prevTitles };
          delete updatedTitles[libraryToRemove];
          return updatedTitles;
        });
  
        setLibraryToRemove(null);
      } catch (error) {
        console.error("Error removing library:", error);
      } finally {
        setLibraryDeleteDialogOpen(false);
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (selectedMockup) {
      setDeleteInProgress(true);
      try {
        await axios.patch(`http://localhost:8000/api/v1/products/${productId}/remove_mockups/`, {
          mockups: [selectedMockup.mockup],
        });
        
        // Filter out the deleted mockup and update the product state
        setProduct((prevProduct) => ({
          ...prevProduct,
          product_images: prevProduct.product_images.filter(
            (image) => image.id !== selectedMockup.id
          ),
        }));
        
        setSelectedMockup(null); // Clear selected mockup
      } catch (error) {
        console.error("Error removing mockup:", error);
      } finally {
        setDeleteInProgress(false);
        setDeleteDialogOpen(false);
      }
    }
  };
  
  const handleSingleDownloadDialogOpen = () => {
    setSingleDownloadDialog(true);
  };

  const handleDownloadAllMockups = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/products/${productId}/download_mockups/`, {
        responseType: 'blob', // Ensure the response is treated as a file (binary data)
      });
  
      // Create a download link for the zip file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `mockups_product_${productId}.zip`); // Set the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setSingleDownloadDialog(false); 
    } catch (error) {
      console.error("Error downloading mockups:", error);
    }
  };

  const handLibraryDownloadDialogOpen = (libraryId) => {
    setLibraryDownloadDialog(true);
    setSelectedLibrary(libraryId)
  };

  const handleDownloadLibraryMockups = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/products/libraries/${selectedLibrary}/download_mockups/`, {
      responseType: 'blob', // Ensures response is treated as binary
    });

    // Create a download link for the zip file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `library_${selectedLibrary}_mockups.zip`); // Set the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setLibraryDownloadDialog(false);
  } catch (error) {
    console.error("Error downloading library mockups:", error);
  }
};
  
  if (loading) {
    return <CircularProgress />;
  }

  if (!product) {
    return <Typography variant="h6">Product not found.</Typography>;
  }
  

  if (loading) {
    return <CircularProgress />;
  }

  if (!product) {
    return <Typography variant="h6">Product not found.</Typography>;
  }

  return (
    <Box sx={{ height: '100vh', width: '45vw' }}>
      {/* Top row: 40% height with two columns */}
      <Grid
        container
        sx={{
          position: 'sticky',
          top: 0, // sticks to the top of the viewport
          backgroundColor: 'white', // Ensure a solid background to prevent transparency issues
          zIndex: 1, // Keep it above other content layers
          padding: 2,
        }}
      >
    {/* Main Image and Product Details */}
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 2 }}>
          <Box>
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
          </Box>
        </Grid>
      <Grid item xs={6} sx={{ padding: 2 }}>
        <Box>
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
      </Grid>
    </Grid>

      {/* Bottom row: 100% width */}
    <Grid container sx={{ height: '60%' }}>
      <Grid item xs={12} sx={{ padding: 2 }}>
        {/* Single Mockup Images */}
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h6" gutterBottom>Single Mockup Images</Typography>
          <IconButton color="primary" onClick={handleMockupsDialogOpen} sx={{ ml: 1 }}>
            <AddCircleOutlineIcon />
          </IconButton>
          <IconButton color="primary" onClick={() => setSingleDownloadDialog(true)}  sx={{ ml: 1 }}>
            <FileDownloadIcon /> {/* Icon for downloading all images as a zip */}
          </IconButton>
        </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            {product.product_images.length > 0 ? (product.product_images.map((image) => (
              <Box key={image.id} sx={{ position: 'relative', textAlign: 'center' }}>
                <Box onClick={() => handleThumbnailClick(image.image_path)} sx={{
                  cursor: 'pointer',
                  border: mainImage === image.image_path ? '2px solid #1976d2' : '2px solid transparent',
                  borderRadius: 2,
                  width: '100px',
                  height: '100px',
                  overflow: 'hidden',
                  mb: 0
                }}
                >
                  <CardMedia component="img" image={image.image_path} alt={`Mockup ${image.id}`} sx={{ width: '100%', height: 'auto' }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <IconButton color="error" onClick={() => handleRemoveMockup(image)}>
                    <Typography>Delete</Typography>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">No mockup images available. Use the "+" icon to add new mockups.</Typography>
          )}
        </Box>
        {/* Updated Library Mockup Images Section */}
        <Box display="flex" alignItems="center" mb={2} mt={2}>
  <Typography variant="h6" gutterBottom>Library Product Images</Typography>
  <IconButton color="primary" onClick={() => setLibrariesDialogOpen(true)} sx={{ ml: 1 }}>
    <AddCircleOutlineIcon />
  </IconButton>
</Box>

{/* Check if there are library titles */}
{Object.keys(libraryTitles).length > 0 ? (
  Object.keys(libraryTitles).map((libraryId) => (
    <Box key={libraryId} sx={{ border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
        <Typography variant="subtitle1" fontWeight="bold">{libraryTitles[libraryId]}</Typography>
        <Box>
          <IconButton color="primary" onClick={() => handLibraryDownloadDialogOpen(parseInt(libraryId))}>
            <FileDownloadIcon fontSize="small" />
          </IconButton>
          <IconButton color="error" onClick={() => handleRemoveLibrary(parseInt(libraryId))}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
        {product.library_product_images
          .filter(image => image.library === parseInt(libraryId))
          .map(image => (
            <Box key={image.id} onClick={() => handleThumbnailClick(image.image_path)} sx={{
                cursor: 'pointer',
                border: mainImage === image.image_path ? '2px solid #1976d2' : '2px solid transparent',
                borderRadius: 2,
                width: '100px',
                height: '100px',
                overflow: 'hidden'
              }}
            >
              <CardMedia component="img" image={image.image_path} alt={`Library Image ${image.id}`} sx={{ width: '100%', height: 'auto' }} />
            </Box>
          ))}
      </Box>
    </Box>
  ))
) : (
  <Typography variant="body2" color="textSecondary">
    No mockup libraries have been assigned to this design. Use the "+" icon to add new mockups.
  </Typography>
)}
      </Grid>
    </Grid>

      {/* Dialogs and other components remain unchanged */}
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
      <Dialog open={libraryDeleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Remove Mockup Library</DialogTitle>
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
              <Typography>Are you sure you want to remove this mockup library from your product?</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!deleteInProgress && (
            <>
              <Button onClick={() => setLibraryDeleteDialogOpen(false)} color="primary">No</Button>
              <Button onClick={confirmRemoveLibrary} color="error">Yes, Delete</Button>
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
      <Dialog open={singleDownloadDialogOpen} onClose={handleLibrariesDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Download Single Assigend Mockups</DialogTitle>
        <DialogContent>
          <Typography>Download .zip with all the single assigned mockup images?</Typography>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => setSingleDownloadDialog(false)} color="primary">No</Button>
        <Button onClick={handleDownloadAllMockups} color="error">Download</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={libraryDownloadDialogOpen} onClose={handleLibrariesDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Download Mockup Library</DialogTitle>
        <DialogContent>
          <Typography>Download .zip with this libraries assigned mockup images?</Typography>
        </DialogContent>
        <DialogActions>
        <Button onClick={() => setLibraryDownloadDialog(false)} color="primary">No</Button>
        <Button onClick={handleDownloadLibraryMockups} color="error">Download</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDetail;