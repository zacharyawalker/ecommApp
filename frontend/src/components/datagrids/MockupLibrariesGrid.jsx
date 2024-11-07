// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Card, CardContent, CardMedia, Typography, Divider, IconButton, Modal, Button, Chip, Alert, Snackbar } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// const MockupLibrariesGrid = () => {
//   const [libraries, setLibraries] = useState([]);
//   const [selectedLibraryId, setSelectedLibraryId] = useState(null);
//   const [selectedMockupId, setSelectedMockupId] = useState(null);
//   const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
//   const [successMessageOpen, setSuccessMessageOpen] = useState(false);

//   useEffect(() => {
//     fetchLibraries();
//   }, []);

//   const fetchLibraries = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/v1/mockups/library/');
//       setLibraries(response.data);
//     } catch (error) {
//       console.error("Error fetching libraries:", error);
//     }
//   };

//   const handleRemoveClick = (libraryId, mockupId) => {
//     setSelectedLibraryId(libraryId);
//     setSelectedMockupId(mockupId);
//     setConfirmationModalOpen(true);
//   };

//   const handleConfirmRemove = async () => {
//     try {
//       await axios.patch(`http://127.0.0.1:8000/api/v1/mockups/library/${selectedLibraryId}/`, {
//         mockups: libraries
//           .find(lib => lib.id === selectedLibraryId)
//           .mockups.filter(mockup => mockup.id !== selectedMockupId).map(mockup => mockup.id)
//       });

//       setLibraries(prevLibraries =>
//         prevLibraries.map(library =>
//           library.id === selectedLibraryId
//             ? { ...library, mockups: library.mockups.filter(mockup => mockup.id !== selectedMockupId) }
//             : library
//         )
//       );

//       setSuccessMessageOpen(true); // Show success message
//       setConfirmationModalOpen(false); // Close confirmation modal
//     } catch (error) {
//       console.error("Error removing mockup from library:", error);
//     }
//   };

//   return (
//     <Box p={4}>
//       {libraries.map((library) => (
//         <Box key={library.id} mb={4}>
//           <Typography variant="h5" mb={2}>{library.title}</Typography>
//           <Box display="flex" flexWrap="wrap" gap={2}>
//             {library.mockups.map((mockup) => (
//               <Card key={mockup.id} sx={{ width: 300, border: '1px solid #ddd', borderRadius: 2, boxShadow: 1, position: 'relative' }}>
//                 <IconButton
//                   size="small"
//                   onClick={() => handleRemoveClick(library.id, mockup.id)}
//                   sx={{
//                     position: 'absolute',
//                     top: 8,
//                     right: 8,
//                     backgroundColor: '#f44336',
//                     color: '#fff',
//                     '&:hover': { backgroundColor: '#d32f2f' },
//                   }}
//                 >
//                   <CloseIcon fontSize="small" />
//                 </IconButton>
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={mockup.mockup_image}
//                   alt={mockup.title}
//                   sx={{ width: 300, objectFit: 'cover' }}
//                 />
//                 <Divider />
//                 <CardContent>
//                   <Typography variant="h6" component="div" fontWeight="bold">
//                     {mockup.title}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Gender: {mockup.gender}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Category: {mockup.product_category ? mockup.product_category.title : 'N/A'}
//                   </Typography>
//                   <Box display="flex" alignItems="center" mt={1}>
//                     <Typography variant="body2" color="textSecondary" mr={1}>
//                       Color:
//                     </Typography>
//                     {mockup.color ? (
//                       <Chip
//                         label={mockup.color.title}
//                         sx={{
//                           backgroundColor: `#${mockup.color.hex_code}`,
//                           color: '#fff',
//                           fontWeight: 'bold',
//                         }}
//                       />
//                     ) : (
//                       <Typography variant="body2" color="textSecondary">N/A</Typography>
//                     )}
//                   </Box>
//                 </CardContent>
//               </Card>
//             ))}
//           </Box>
//         </Box>
//       ))}

//       {/* Confirmation Modal */}
//       <Modal open={confirmationModalOpen} onClose={() => setConfirmationModalOpen(false)}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 300,
//             bgcolor: 'background.paper',
//             borderRadius: 2,
//             p: 3,
//             boxShadow: 24,
//           }}
//         >
//           <Typography variant="h6" mb={2}>
//             Are you sure you want to remove this mockup from the library?
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleConfirmRemove}
//             sx={{ mt: 2, width: '100%' }}
//           >
//             Yes, Remove
//           </Button>
//           <Button
//             variant="outlined"
//             onClick={() => setConfirmationModalOpen(false)}
//             sx={{ mt: 2, width: '100%' }}
//           >
//             Cancel
//           </Button>
//         </Box>
//       </Modal>

//       {/* Success Snackbar */}
//       <Snackbar
//         open={successMessageOpen}
//         autoHideDuration={3000}
//         onClose={() => setSuccessMessageOpen(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setSuccessMessageOpen(false)} severity="success">
//           Mockup removed from library successfully!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default MockupLibrariesGrid;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Card, CardContent, CardMedia, Typography, Divider, IconButton, Modal, Button, Chip, Alert, Snackbar } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// const MockupLibrariesGrid = () => {
//   const [libraries, setLibraries] = useState([]);
//   const [selectedLibraryId, setSelectedLibraryId] = useState(null);
//   const [selectedMockupId, setSelectedMockupId] = useState(null);
//   const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
//   const [successMessageOpen, setSuccessMessageOpen] = useState(false);

//   useEffect(() => {
//     fetchLibraries();
//   }, []);

//   const fetchLibraries = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/v1/mockups/library/');
//       setLibraries(response.data);
//     } catch (error) {
//       console.error("Error fetching libraries:", error);
//     }
//   };

//   const handleRemoveClick = (libraryId, mockupId) => {
//     setSelectedLibraryId(libraryId);
//     setSelectedMockupId(mockupId);
//     setConfirmationModalOpen(true);
//   };

//   const handleConfirmRemove = async () => {
//     try {
//       const library = libraries.find(lib => lib.id === selectedLibraryId);
//       const updatedMockups = library.mockups.filter(mockup => mockup.id !== selectedMockupId).map(mockup => mockup.id);

//       await axios.patch(`http://127.0.0.1:8000/api/v1/mockups/library/${selectedLibraryId}/`, {
//         mockups: updatedMockups,
//       });

//       setLibraries(prevLibraries =>
//         prevLibraries.map(library =>
//           library.id === selectedLibraryId
//             ? { ...library, mockups: library.mockups.filter(mockup => mockup.id !== selectedMockupId) }
//             : library
//         )
//       );

//       setSuccessMessageOpen(true); // Show success message
//       setConfirmationModalOpen(false); // Close confirmation modal
//     } catch (error) {
//       console.error("Error removing mockup from library:", error);
//     }
//   };

//   return (
//     <Box p={4}>
//       {libraries.map((library) => (
//         <Box key={library.id} mb={4} p={3} sx={{ border: '1px solid #ddd', borderRadius: 2, boxShadow: 1 }}>
//           <Typography variant="h5" mb={2}>{library.title}</Typography>
//           <Box display="flex" flexWrap="wrap" gap={2}>
//             {library.mockups.map((mockup) => (
//               <Card key={mockup.id} sx={{ width: 300, border: '1px solid #ddd', borderRadius: 2, boxShadow: 1, position: 'relative' }}>
//                 <IconButton
//                   size="small"
//                   onClick={() => handleRemoveClick(library.id, mockup.id)}
//                   sx={{
//                     position: 'absolute',
//                     top: 8,
//                     right: 8,
//                     backgroundColor: '#f44336',
//                     color: '#fff',
//                     '&:hover': { backgroundColor: '#d32f2f' },
//                   }}
//                 >
//                   <CloseIcon fontSize="small" />
//                 </IconButton>
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={mockup.mockup_image}
//                   alt={mockup.title}
//                   sx={{ width: 300, objectFit: 'cover' }}
//                 />
//                 <Divider />
//                 <CardContent>
//                   <Typography variant="h6" component="div" fontWeight="bold">
//                     {mockup.title}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Gender: {mockup.gender}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Category: {mockup.product_category ? mockup.product_category.title : 'N/A'}
//                   </Typography>
//                   <Box display="flex" alignItems="center" mt={1}>
//                     <Typography variant="body2" color="textSecondary" mr={1}>
//                       Color:
//                     </Typography>
//                     {mockup.color ? (
//                       <Chip
//                         label={mockup.color.title}
//                         sx={{
//                           backgroundColor: `#${mockup.color.hex_code}`,
//                           color: '#fff',
//                           fontWeight: 'bold',
//                         }}
//                       />
//                     ) : (
//                       <Typography variant="body2" color="textSecondary">N/A</Typography>
//                     )}
//                   </Box>
//                 </CardContent>
//               </Card>
//             ))}
//           </Box>
//         </Box>
//       ))}

//       {/* Confirmation Modal */}
//       <Modal open={confirmationModalOpen} onClose={() => setConfirmationModalOpen(false)}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 300,
//             bgcolor: 'background.paper',
//             borderRadius: 2,
//             p: 3,
//             boxShadow: 24,
//           }}
//         >
//           <Typography variant="h6" mb={2}>
//             Are you sure you want to remove this mockup from the library?
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleConfirmRemove}
//             sx={{ mt: 2, width: '100%' }}
//           >
//             Yes, Remove
//           </Button>
//           <Button
//             variant="outlined"
//             onClick={() => setConfirmationModalOpen(false)}
//             sx={{ mt: 2, width: '100%' }}
//           >
//             Cancel
//           </Button>
//         </Box>
//       </Modal>

//       {/* Success Snackbar */}
//       <Snackbar
//         open={successMessageOpen}
//         autoHideDuration={3000}
//         onClose={() => setSuccessMessageOpen(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setSuccessMessageOpen(false)} severity="success">
//           Mockup removed from library successfully!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default MockupLibrariesGrid;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Card, CardContent, CardMedia, Typography, Divider, IconButton, Snackbar, Alert } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// const MockupLibrariesGrid = () => {
//   const [libraries, setLibraries] = useState([]);
//   const [successMessageOpen, setSuccessMessageOpen] = useState(false);
//   const [errorMessageOpen, setErrorMessageOpen] = useState(false);

//   useEffect(() => {
//     fetchLibraries();
//   }, []);

//   const fetchLibraries = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/v1/mockups/library/');
//       setLibraries(response.data);
//     } catch (error) {
//       console.error("Error fetching libraries:", error);
//     }
//   };

//   const handleRemoveFromLibrary = async (mockupId, libraryId) => {
//     try {
//       await axios.post(`http://localhost:8000/api/v1/mockups/library/${libraryId}/remove_mockup/`, {
//         mockup_id: mockupId,
//       });

//       // Update the local state to reflect the removal
//       setLibraries((prevLibraries) =>
//         prevLibraries.map((library) =>
//           library.id === libraryId
//             ? { ...library, mockups: library.mockups.filter((mockup) => mockup.id !== mockupId) }
//             : library
//         )
//       );

//       setSuccessMessageOpen(true); // Show success message
//     } catch (error) {
//       console.error("Error removing mockup from library:", error);
//       setErrorMessageOpen(true); // Show error message
//     }
//   };

//   return (
//     <Box p={4}>
//       {libraries.map((library) => (
//         <Box key={library.id} mb={4} p={3} sx={{ border: '1px solid #ddd', borderRadius: 2, boxShadow: 1 }}>
//           <Typography variant="h5" mb={2}>{library.title}</Typography>
//           <Box display="flex" flexWrap="wrap" gap={2}>
//             {library.mockups.map((mockup) => (
//               <Card key={mockup.id} sx={{ width: 300, border: '1px solid #ddd', borderRadius: 2, boxShadow: 1, position: 'relative' }}>
//                 {/* Remove from Library Icon */}
//                 <IconButton
//                   size="small"
//                   onClick={() => handleRemoveFromLibrary(mockup.id, library.id)}
//                   sx={{
//                     position: 'absolute',
//                     top: 8,
//                     right: 8,
//                     backgroundColor: '#f44336',
//                     color: '#fff',
//                     '&:hover': { backgroundColor: '#d32f2f' },
//                   }}
//                 >
//                   <CloseIcon fontSize="small" />
//                 </IconButton>
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={mockup.mockup_image}
//                   alt={mockup.title}
//                   sx={{ width: 300, objectFit: 'cover' }}
//                 />
//                 <Divider />
//                 <CardContent>
//                   <Typography variant="h6" component="div" fontWeight="bold">
//                     {mockup.title}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Gender: {mockup.gender}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Category: {mockup.product_category ? mockup.product_category.title : 'N/A'}
//                   </Typography>
//                   <Box display="flex" alignItems="center" mt={1}>
//                     <Typography variant="body2" color="textSecondary" mr={1}>
//                       Color:
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       {mockup.color ? mockup.color.title : 'N/A'}
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             ))}
//           </Box>
//         </Box>
//       ))}

//       {/* Success Snackbar */}
//       <Snackbar
//         open={successMessageOpen}
//         autoHideDuration={3000}
//         onClose={() => setSuccessMessageOpen(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setSuccessMessageOpen(false)} severity="success">
//           Mockup removed from library successfully!
//         </Alert>
//       </Snackbar>

//       {/* Error Snackbar */}
//       <Snackbar
//         open={errorMessageOpen}
//         autoHideDuration={3000}
//         onClose={() => setErrorMessageOpen(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setErrorMessageOpen(false)} severity="error">
//           There was an error removing the mockup from the library.
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default MockupLibrariesGrid;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Card, CardContent, CardMedia, Typography, Divider, IconButton, Modal, Button, Snackbar, Alert } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// const MockupLibrariesGrid = () => {
//   const [libraries, setLibraries] = useState([]);
//   const [selectedLibraryId, setSelectedLibraryId] = useState(null);
//   const [selectedMockupId, setSelectedMockupId] = useState(null);
//   const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
//   const [successMessageOpen, setSuccessMessageOpen] = useState(false);
//   const [errorMessageOpen, setErrorMessageOpen] = useState(false);

//   useEffect(() => {
//     fetchLibraries();
//   }, []);

//   const fetchLibraries = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/v1/mockups/library/');
//       setLibraries(response.data);
//     } catch (error) {
//       console.error("Error fetching libraries:", error);
//     }
//   };

//   const handleRemoveClick = (libraryId, mockupId) => {
//     // Set selected IDs and open confirmation modal
//     setSelectedLibraryId(libraryId);
//     setSelectedMockupId(mockupId);
//     setConfirmationModalOpen(true);
//   };

//   const handleConfirmRemove = async () => {
//     try {
//       await axios.post(`http://localhost:8000/api/v1/mockups/library/${selectedLibraryId}/remove_mockup/`, {
//         mockup_id: selectedMockupId,
//       });

//       // Update local state to reflect removal
//       setLibraries((prevLibraries) =>
//         prevLibraries.map((library) =>
//           library.id === selectedLibraryId
//             ? { ...library, mockups: library.mockups.filter((mockup) => mockup.id !== selectedMockupId) }
//             : library
//         )
//       );

//       setConfirmationModalOpen(false); // Close confirmation modal
//       setSuccessMessageOpen(true); // Show success message
//     } catch (error) {
//       console.error("Error removing mockup from library:", error);
//       setErrorMessageOpen(true); // Show error message
//     }
//   };

//   return (
//     <Box p={4}>
//       {libraries.map((library) => (
//         <Box key={library.id} mb={4} p={3} sx={{ border: '1px solid #ddd', borderRadius: 2, boxShadow: 1 }}>
//           <Typography variant="h5" mb={2}>{library.title}</Typography>
//           <Box display="flex" flexWrap="wrap" gap={2}>
//             {library.mockups.map((mockup) => (
//               <Card key={mockup.id} sx={{ width: 300, border: '1px solid #ddd', borderRadius: 2, boxShadow: 1, position: 'relative' }}>
//                 {/* Remove Icon */}
//                 <IconButton
//                   size="small"
//                   onClick={() => handleRemoveClick(library.id, mockup.id)} // Open confirmation modal
//                   sx={{
//                     position: 'absolute',
//                     top: 8,
//                     right: 8,
//                     backgroundColor: '#f44336',
//                     color: '#fff',
//                     '&:hover': { backgroundColor: '#d32f2f' },
//                   }}
//                 >
//                   <CloseIcon fontSize="small" />
//                 </IconButton>
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={mockup.mockup_image}
//                   alt={mockup.title}
//                   sx={{ width: 300, objectFit: 'cover' }}
//                 />
//                 <Divider />
//                 <CardContent>
//                   <Typography variant="h6" component="div" fontWeight="bold">
//                     {mockup.title}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Gender: {mockup.gender}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Category: {mockup.product_category ? mockup.product_category.title : 'N/A'}
//                   </Typography>
//                   <Box display="flex" alignItems="center" mt={1}>
//                     <Typography variant="body2" color="textSecondary" mr={1}>
//                       Color:
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary">
//                       {mockup.color ? mockup.color.title : 'N/A'}
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             ))}
//           </Box>
//         </Box>
//       ))}

//       {/* Confirmation Modal for Removal */}
//       <Modal open={confirmationModalOpen} onClose={() => setConfirmationModalOpen(false)}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 300,
//             bgcolor: 'background.paper',
//             borderRadius: 2,
//             p: 3,
//             boxShadow: 24,
//           }}
//         >
//           <Typography variant="h6" mb={2}>
//             Are you sure you want to remove this mockup from the library?
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleConfirmRemove}
//             sx={{ mt: 2, width: '100%' }}
//           >
//             Yes, Remove
//           </Button>
//           <Button
//             variant="outlined"
//             onClick={() => setConfirmationModalOpen(false)}
//             sx={{ mt: 2, width: '100%' }}
//           >
//             Cancel
//           </Button>
//         </Box>
//       </Modal>

//       {/* Success Snackbar */}
//       <Snackbar
//         open={successMessageOpen}
//         autoHideDuration={3000}
//         onClose={() => setSuccessMessageOpen(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setSuccessMessageOpen(false)} severity="success">
//           Mockup removed from library successfully!
//         </Alert>
//       </Snackbar>

//       {/* Error Snackbar */}
//       <Snackbar
//         open={errorMessageOpen}
//         autoHideDuration={3000}
//         onClose={() => setErrorMessageOpen(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setErrorMessageOpen(false)} severity="error">
//           There was an error removing the mockup from the library.
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default MockupLibrariesGrid;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { DataGrid } from '@mui/x-data-grid';
// import { IconButton, Box, Typography } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import { useNavigate } from 'react-router-dom';

// const MockupLibrariesGrid = () => {
//   const navigate = useNavigate();
//   const [libraries, setLibraries] = useState([]);

//   useEffect(() => {
//     fetchLibraries();
//   }, []);

//   const fetchLibraries = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/v1/mockups/library/');
//       setLibraries(response.data);
//     } catch (error) {
//       console.error("Error fetching libraries:", error);
//     }
//   };

//   const handleNavigateToDetails = (id) => {
//     navigate(`/mockups/libraries/${id}`);
//   };

//   const columns = [
//     {
//       field: 'title',
//       headerName: 'Library Title',
//       width: 300,
//       renderCell: (params) => (
//         <Typography
//           style={{ cursor: 'pointer', color: '#1e88e5' }}
//           onClick={() => handleNavigateToDetails(params.row.id)}
//         >
//           {params.value}
//         </Typography>
//       ),
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 100,
//       sortable: false,
//       renderCell: (params) => (
//         <IconButton
//           onClick={() => handleNavigateToDetails(params.row.id)}
//           color="primary"
//         >
//           <EditIcon />
//         </IconButton>
//       ),
//     },
//   ];

//   const rows = libraries.map((library) => ({
//     id: library.id,
//     title: library.title,
//   }));

//   return (
//     <Box p={4}>
//       <Typography variant="h4" gutterBottom>Mockup Libraries</Typography>
//       <Box height={400}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           pageSize={5}
//           disableSelectionOnClick
//         />
//       </Box>
//     </Box>
//   );
// };

// export default MockupLibrariesGrid;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Box, Typography, Tooltip, Button, Alert, Slide, Modal, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
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
      const response = await axios.get('http://localhost:8000/api/v1/mockups/library/');
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
      await axios.delete(`http://localhost:8000/api/v1/mockups/library/${libraryToDelete}/`);
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