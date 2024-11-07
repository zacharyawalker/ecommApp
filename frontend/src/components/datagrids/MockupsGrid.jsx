// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Select,
//   MenuItem,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Grid,
//   Modal,
//   Button,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
// } from '@mui/material';
// import ViewModuleIcon from '@mui/icons-material/ViewModule';
// import ViewListIcon from '@mui/icons-material/ViewList';
// import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
// import AddBoxIcon from '@mui/icons-material/AddBox';

// const MockupsGrid = () => {
//   const [mockups, setMockups] = useState([]);
//   const [filteredMockups, setFilteredMockups] = useState([]);
//   const [isGridView, setIsGridView] = useState(true);
//   const [filterByGender, setFilterByGender] = useState('All');
//   const [filterByColor, setFilterByColor] = useState('All');
//   const [availableColors, setAvailableColors] = useState([]);
//   const [libraryModalOpen, setLibraryModalOpen] = useState(false);
//   const [libraries, setLibraries] = useState([]); // Stores available libraries
//   const [selectedMockupId, setSelectedMockupId] = useState(null); // Mockup ID for modal

//   useEffect(() => {
//     fetchMockups();
//     fetchLibraries();
//   }, []);

//   const fetchMockups = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/v1/mockups/');
//       const mockupsData = response.data;
//       setMockups(mockupsData);
//       setFilteredMockups(mockupsData);
//       updateAvailableColors(mockupsData);
//     } catch (error) {
//       console.error("Error fetching mockups:", error);
//     }
//   };

//   const getMyMockupsLibraryId = async () => {
//         try {
//           const response = await axios.get('http://localhost:8000/api/v1/mockups/library/');
//           const librariesData = response.data;
          
//           // Find the library with the title "My Mockups"
//           const myMockupsLibrary = librariesData.find(library => library.title === "My Mockups");
          
//           return myMockupsLibrary ? myMockupsLibrary.id : null;
//         } catch (error) {
//           console.error("Error fetching My Mockups library ID:", error);
//           return null;
//         }
//       };
//       const fetchLibraries = async () => {
//         try {
//           const response = await axios.get('http://localhost:8000/api/v1/mockups/library/');
//           // Filter out the "My Mockups" library from the list
//           const filteredLibraries = response.data.filter(library => library.title !== "My Mockups");
//           setLibraries(filteredLibraries);
//         } catch (error) {
//           console.error("Error fetching libraries:", error);
//         }
//       };

//   const updateAvailableColors = (mockupsList) => {
//     const colors = mockupsList
//       .filter((mockup) => mockup.color)
//       .map((mockup) => mockup.color.title);
//     const uniqueColors = Array.from(new Set(colors));
//     setAvailableColors(uniqueColors);
//   };

//   useEffect(() => {
//     let filtered = mockups;
//     if (filterByGender !== 'All') {
//       filtered = filtered.filter(mockup => mockup.gender === filterByGender);
//     }
//     if (filterByColor !== 'All') {
//       filtered = filtered.filter(mockup => mockup.color && mockup.color.title === filterByColor);
//     }
//     setFilteredMockups(filtered);
//     updateAvailableColors(filtered);
//   }, [filterByGender, filterByColor, mockups]);

//   // Add mockup to My Mockups library (Library ID 8)
//   const addToMyMockups = async (mockupId) => {
//     const myMockupsLibraryId = await getMyMockupsLibraryId(); // Get the ID of "My Mockups"
//     try {
//       await axios.post(`http://localhost:8000/api/v1/mockups/library/${myMockupsLibraryId}/add_mockup/`, {
//         mockup_id: mockupId,
//       });
//       alert("Mockup added to My Mockups library.");
//     } catch (error) {
//       console.error("Error adding to My Mockups library:", error);
//     }
//   };

//   // Open modal to select another library
//   const handleAddToAnotherLibrary = (mockupId) => {
//     setSelectedMockupId(mockupId);
//     setLibraryModalOpen(true);
//   };

//   // Handle library selection in modal
//   const addToSelectedLibrary = async (libraryId) => {
//     try {
//       await axios.post(`http://localhost:8000/api/v1/mockups/library/${libraryId}/add_mockup/`, {
//         mockup_id: selectedMockupId,
//       });
//       alert("Mockup added to selected library.");
//       setLibraryModalOpen(false);
//       const goToLibrary = window.confirm("Do you want to go to the selected library?");
//       if (goToLibrary) {
//         window.location.href = `mockups/libraries/${libraryId}`;
//       }
//     } catch (error) {
//       console.error("Error adding to selected library:", error);
//     }
//   };

//   return (
//     <Box p={3}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h6">Available Mockups</Typography>
//         <Box>
//           <IconButton onClick={() => setIsGridView(true)}>
//             <ViewModuleIcon color={isGridView ? 'primary' : 'inherit'} />
//           </IconButton>
//           <IconButton onClick={() => setIsGridView(false)}>
//             <ViewListIcon color={!isGridView ? 'primary' : 'inherit'} />
//           </IconButton>
//         </Box>
//       </Box>

//       {/* Filter Controls */}
//       <Box display="flex" gap={2} mb={3}>
//         <FormControl variant="outlined" fullWidth>
//           <InputLabel>Gender</InputLabel>
//           <Select
//             value={filterByGender}
//             onChange={(e) => setFilterByGender(e.target.value)}
//             label="Gender"
//           >
//             <MenuItem value="All">All</MenuItem>
//             <MenuItem value="Male">Male</MenuItem>
//             <MenuItem value="Female">Female</MenuItem>
//             <MenuItem value="Unisex">Unisex</MenuItem>
//           </Select>
//         </FormControl>

//         <FormControl variant="outlined" fullWidth>
//           <InputLabel>Color</InputLabel>
//           <Select
//             value={filterByColor}
//             onChange={(e) => setFilterByColor(e.target.value)}
//             label="Color"
//           >
//             <MenuItem value="All">All</MenuItem>
//             {availableColors.map((color) => (
//               <MenuItem key={color} value={color}>
//                 {color}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Box>

//       <Grid container spacing={2} flexDirection={isGridView ? 'row' : 'column'}>
//         {filteredMockups.map((mockup) => (
//           <Grid item xs={12} sm={isGridView ? 4 : 12} key={mockup.id}>
//             <Card
//               sx={{
//                 display: isGridView ? 'block' : 'flex',
//                 border: '1px solid #ddd',
//                 borderRadius: 2,
//                 boxShadow: 1,
//               }}
//             >
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={mockup.mockup_image}
//                 alt={mockup.title}
//                 sx={{ width: isGridView ? '100%' : 200, objectFit: 'cover' }}
//               />
//               <CardContent sx={{ flex: 1 }}>
//                 <Typography variant="h6" component="div" fontWeight="bold">
//                   {mockup.title}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   Gender: {mockup.gender}
//                 </Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   Category: {mockup.product_category ? mockup.product_category.title : 'N/A'}
//                 </Typography>
                
//                 {/* Action Icons */}
//                 <Box mt={2} display="flex" justifyContent="space-between">
//                   <IconButton onClick={() => addToMyMockups(mockup.id)}>
//                     <AddBoxIcon color="primary" />
//                   </IconButton>
//                   <IconButton onClick={() => handleAddToAnotherLibrary(mockup.id)}>
//                     <LibraryAddIcon color="secondary" />
//                   </IconButton>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Library Selection Modal */}
//       <Modal
//         open={libraryModalOpen}
//         onClose={() => setLibraryModalOpen(false)}
//         aria-labelledby="select-library"
//         aria-describedby="select-library-to-add-mockup"
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 300,
//             bgcolor: 'background.paper',
//             color: 'text.primary',
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//         <Typography variant="h6" id="select-library" mb={2} color="text.primary">
//           Select Library
//         </Typography>
//           {libraries.length > 0 ? (
//             <List>
//               {libraries.map((library) => (
//                 <ListItem key={library.id} disablePadding>
//                   <ListItemButton
//                     onClick={() => addToSelectedLibrary(library.id)}
//                     sx={{
//                       // bgcolor: 'background.paper',
//                       color: 'text.primary',
//                       '& .MuiListItemText-root': {
//                         color: 'text.primary',      // Explicitly set text color
//                       },
//                       '&:hover': {
//                         bgcolor: 'action.hover',    // Set background on hover
//                         color: 'text.secondary',    // Set hover text color
//                       },
//                     }}
//             >
//               <ListItemText
//                 primary={library.title}
//                 primaryTypographyProps={{
//                   sx: { color: 'text.primary !important' } // Force primary text color
//                 }}
//               />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     ) : (
//       <Typography variant="body2" color="error">
//         No libraries found. Check data loading.
//       </Typography>
//     )}
//   </Box>
// </Modal>
//     </Box>
//   );
// };

// export default MockupsGrid;

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Select,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
  Grid,
  Modal,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Alert,
  Slide,
} from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StarIcon from '@mui/icons-material/Star'; 

const MockupsGrid = () => {
  const [mockups, setMockups] = useState([]);
  const [filteredMockups, setFilteredMockups] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [filterByGender, setFilterByGender] = useState('All');
  const [filterByColor, setFilterByColor] = useState('All');
  const [availableColors, setAvailableColors] = useState([]);
  const [libraryModalOpen, setLibraryModalOpen] = useState(false);
  const [libraries, setLibraries] = useState([]);
  const [selectedMockupId, setSelectedMockupId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [redirectLibraryId, setRedirectLibraryId] = useState(null);
  const [myMockupsIds, setMyMockupsIds] = useState([]); // Stores IDs of mockups in "My Mockups"

  useEffect(() => {
    fetchMockups();
    fetchLibraries();
  }, []);

  const fetchMockups = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/mockups/');
      const mockupsData = response.data;
      setMockups(mockupsData);
      setFilteredMockups(mockupsData);
      updateAvailableColors(mockupsData);
    } catch (error) {
      console.error("Error fetching mockups:", error);
    }
  };

  const fetchMyMockups = async () => {
    const myMockupsLibraryId = await getMyMockupsLibraryId();
    if (myMockupsLibraryId) {
      try {
        // Access `mockups` property within the response data
        const response = await axios.get(`http://localhost:8000/api/v1/mockups/library/${myMockupsLibraryId}/`);
        const mockupIds = response.data.mockups.map(mockup => mockup.id); // Accessing nested `mockups` array
        setMyMockupsIds(mockupIds);
        console.log("My Mockups IDs:", mockupIds); // Debugging to confirm IDs are set correctly
      } catch (error) {
        console.error("Error fetching My Mockups items:", error);
      }
    }
  };
  
  // Call fetchMyMockups along with fetchLibraries
  useEffect(() => {
    fetchMockups();
    fetchLibraries();
    fetchMyMockups(); // Fetch after fetchLibraries and fetchMockups
  }, []);

  const getMyMockupsLibraryId = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/mockups/library/');
      const librariesData = response.data;
      const myMockupsLibrary = librariesData.find(library => library.title === "My Mockups");
      return myMockupsLibrary ? myMockupsLibrary.id : null;
    } catch (error) {
      console.error("Error fetching My Mockups library ID:", error);
      return null;
    }
  };

  const fetchLibraries = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/mockups/library/');
      const filteredLibraries = response.data.filter(library => library.title !== "My Mockups");
      setLibraries(filteredLibraries);
    } catch (error) {
      console.error("Error fetching libraries:", error);
    }
  };

  const updateAvailableColors = (mockupsList) => {
    const colors = mockupsList
      .filter((mockup) => mockup.color)
      .map((mockup) => mockup.color.title);
    const uniqueColors = Array.from(new Set(colors));
    setAvailableColors(uniqueColors);
  };

  useEffect(() => {
    let filtered = mockups;
    if (filterByGender !== 'All') {
      filtered = filtered.filter(mockup => mockup.gender === filterByGender);
    }
    if (filterByColor !== 'All') {
      filtered = filtered.filter(mockup => mockup.color && mockup.color.title === filterByColor);
    }
    setFilteredMockups(filtered);
    updateAvailableColors(filtered);
  }, [filterByGender, filterByColor, mockups]);

  const addToMyMockups = async (mockupId) => {
    const myMockupsLibraryId = await getMyMockupsLibraryId();
    if (!myMockupsLibraryId) return;
  
    try {
      await axios.post(`http://localhost:8000/api/v1/mockups/library/${myMockupsLibraryId}/add_mockup/`, {
        mockup_id: mockupId,
      });
      displaySuccessMessage("Mockup added to My Mockups library.", myMockupsLibraryId);
      fetchMyMockups();  // Refresh "My Mockups" IDs immediately after adding
    } catch (error) {
      console.error("Error adding to My Mockups library:", error);
    }
  };

  const handleAddToAnotherLibrary = (mockupId) => {
    setSelectedMockupId(mockupId);
    setLibraryModalOpen(true);
  };

  const addToSelectedLibrary = async (libraryId) => {
    try {
      await axios.post(`http://localhost:8000/api/v1/mockups/library/${libraryId}/add_mockup/`, {
        mockup_id: selectedMockupId,
      });
      setLibraryModalOpen(false);
      displaySuccessMessage("Mockup added to selected library.", libraryId);
    } catch (error) {
      console.error("Error adding to selected library:", error);
    }
  };

  const displaySuccessMessage = (message, libraryId) => {
    setSuccessMessage(message);
    setRedirectLibraryId(libraryId);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <Box p={3}>

      {/* Success Banner */}
      <Slide in={!!successMessage} direction="down" mountOnEnter unmountOnExit>
        <Box
          sx={{
            backgroundColor: '#4caf50', // System green
            color: 'white',
            borderRadius: 2,
            p: 2,
            mb: 2,
            boxShadow: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1">{successMessage}</Typography>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => window.location.href = `mockups/libraries/${redirectLibraryId}`}
            sx={{
              marginLeft: 'auto',
              color: '#4caf50',
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: '#f1f1f1',
              },
            }}
          >
            Go to Library
          </Button>
        </Box>
      </Slide>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Available Mockups</Typography>
        <Box>
          <IconButton onClick={() => setIsGridView(true)}>
            <ViewModuleIcon color={isGridView ? 'primary' : 'inherit'} />
          </IconButton>
          <IconButton onClick={() => setIsGridView(false)}>
            <ViewListIcon color={!isGridView ? 'primary' : 'inherit'} />
          </IconButton>
        </Box>
      </Box>

      {/* Filter Controls */}
      <Box display="flex" gap={2} mb={3}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select
            value={filterByGender}
            onChange={(e) => setFilterByGender(e.target.value)}
            label="Gender"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Unisex">Unisex</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" fullWidth>
          <InputLabel>Color</InputLabel>
          <Select
            value={filterByColor}
            onChange={(e) => setFilterByColor(e.target.value)}
            label="Color"
          >
            <MenuItem value="All">All</MenuItem>
            {availableColors.map((color) => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={2} flexDirection={isGridView ? 'row' : 'column'}>
        {filteredMockups.map((mockup) => (
          <Grid item xs={12} sm={isGridView ? 2 : 12} key={mockup.id}>
            <Card
              sx={{
                display: isGridView ? 'block' : 'flex',
                border: '1px solid #ddd',
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <CardMedia
                component="img"
                height="auto"
                image={mockup.mockup_image}
                alt={mockup.title}
                sx={{ width: isGridView ? '100%' : 200, objectFit: 'cover' }}
              />
              <CardContent sx={{ flex: 1, p: 1 }}>
              <Typography variant="subtitle1" component="div" fontWeight="bold">
                {mockup.title}
                {myMockupsIds.includes(mockup.id) && (
                  <StarIcon sx={{ fontSize: 18, color: '#4caf50', ml: 1 }} />
                )}
              </Typography>
                <Typography variant="body2" color="textSecondary">
                  Gender: {mockup.gender}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Category: {mockup.product_category ? mockup.product_category.title : 'N/A'}
                </Typography>
                
                {/* Action Icons */}
                <Box mt={2} display="flex" justifyContent="space-between">
                  <IconButton onClick={() => addToMyMockups(mockup.id)}>
                    <AddBoxIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => handleAddToAnotherLibrary(mockup.id)}>
                    <LibraryAddIcon color="secondary" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Library Selection Modal */}
      <Modal
        open={libraryModalOpen}
        onClose={() => setLibraryModalOpen(false)}
        aria-labelledby="select-library"
        aria-describedby="select-library-to-add-mockup"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: 'background.paper',
            color: 'text.primary',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" id="select-library" mb={2} color="text.primary">
            Select Library
          </Typography>
          {libraries.length > 0 ? (
            <List>
              {libraries.map((library) => (
                <ListItem key={library.id} disablePadding>
                  <ListItemButton
                    onClick={() => addToSelectedLibrary(library.id)}
                    sx={{
                      color: 'text.primary',
                      '&:hover': {
                        bgcolor: 'action.hover',
                        color: 'text.secondary',
                      },
                    }}
                  >
                    <ListItemText
                      primary={library.title}
                      primaryTypographyProps={{ sx: { color: 'text.primary' } }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="error">
              No libraries found. Check data loading.
            </Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default MockupsGrid;