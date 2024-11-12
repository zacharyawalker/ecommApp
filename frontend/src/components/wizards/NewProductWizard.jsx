// import React, { useState, useEffect } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Stepper, 
//   Step, 
//   StepLabel, 
//   Button, 
//   TextField, 
//   Grid, 
//   Card, 
//   CardMedia, 
//   CardContent, 
//   Autocomplete 
// } from '@mui/material';
// import axios from 'axios';

// const NewProductWizard = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [designs, setDesigns] = useState([]);
//   const [filteredDesigns, setFilteredDesigns] = useState([]);
//   const [selectedDesign, setSelectedDesign] = useState(null);
//   const [productTitle, setProductTitle] = useState('');
//   const [productDescription, setProductDescription] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   const steps = ['Choose Design', 'Product Details'];

//   // Fetch designs on component mount
//   useEffect(() => {
//     const fetchDesigns = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/v1/designs/');
//         setDesigns(response.data);
//         setFilteredDesigns(response.data);
//       } catch (error) {
//         console.error('Error fetching designs:', error);
//       }
//     };
//     fetchDesigns();
//   }, []);

//   // Filter designs based on search term
//   useEffect(() => {
//     const filtered = designs.filter((design) =>
//       design.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredDesigns(filtered);
//   }, [searchTerm, designs]);

//   const handleNext = () => {
//     if (activeStep < steps.length - 1) {
//       setActiveStep((prevStep) => prevStep + 1);
//     } else {
//       handleSubmit();
//     }
//   };

//   const handleBack = () => {
//     if (activeStep > 0) {
//       setActiveStep((prevStep) => prevStep - 1);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.post('http://localhost:8000/api/v1/products/', {
//         design_id: selectedDesign.id,
//         title: productTitle,
//         description: productDescription,
//       });
//       alert('Product created successfully!');
//       setActiveStep(0);
//       setSelectedDesign(null);
//       setProductTitle('');
//       setProductDescription('');
//     } catch (error) {
//       console.error('Error creating product:', error);
//       alert('Error creating product.');
//     }
//   };

//   return (
//     <Box p={4}>
//       <Typography variant="h4" gutterBottom>Create New Product</Typography>
//       <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
//         {steps.map((label, index) => (
//           <Step key={index}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       {activeStep === 0 && (
//         <Box>
//           <Autocomplete
//             options={designs}
//             getOptionLabel={(option) => option.title}
//             onInputChange={(e, value) => setSearchTerm(value)}
//             renderInput={(params) => (
//               <TextField {...params} label="Search Design" fullWidth margin="normal" />
//             )}
//           />
//           <Grid container spacing={2}>
//             {filteredDesigns.map((design) => (
//               <Grid item xs={12} sm={4} md={3} key={design.id}>
//                 <Card
//                   onClick={() => setSelectedDesign(design)}
//                   sx={{
//                     border: selectedDesign?.id === design.id ? '2px solid #4caf50' : '1px solid #ddd',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   <CardMedia
//                     component="img"
//                     height="140"
//                     image={design.design_image} // Assuming a thumbnail URL is provided in design data
//                     alt={design.title}
//                   />
//                   <CardContent>
//                     <Typography variant="subtitle1">{design.title}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       )}

//       {activeStep === 1 && (
//         <Box>
//           <TextField
//             label="Product Title"
//             value={productTitle}
//             onChange={(e) => setProductTitle(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Product Description"
//             value={productDescription}
//             onChange={(e) => setProductDescription(e.target.value)}
//             fullWidth
//             margin="normal"
//             multiline
//             rows={4}
//             required
//           />
//         </Box>
//       )}

//       <Box display="flex" justifyContent="space-between" mt={4}>
//         <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleNext}
//           disabled={activeStep === 0 && !selectedDesign} // Disable "Next" if no design selected
//         >
//           {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default NewProductWizard;

// import React, { useState, useEffect } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Stepper, 
//   Step, 
//   StepLabel, 
//   Button, 
//   TextField, 
//   Grid, 
//   Card, 
//   CardMedia, 
//   CardContent, 
//   Autocomplete 
// } from '@mui/material';
// import axios from 'axios';

// const NewProductWizard = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [designs, setDesigns] = useState([]);
//   const [filteredDesigns, setFilteredDesigns] = useState([]);
//   const [selectedDesign, setSelectedDesign] = useState(null);
//   const [productTitle, setProductTitle] = useState('');
//   const [productDescription, setProductDescription] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   const steps = ['Choose Design', 'Product Details'];

//   // Fetch designs on component mount
//   useEffect(() => {
//     const fetchDesigns = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/v1/designs/');
//         setDesigns(response.data);
//         setFilteredDesigns(response.data);
//       } catch (error) {
//         console.error('Error fetching designs:', error);
//       }
//     };
//     fetchDesigns();
//   }, []);

//   // Filter designs based on search term
//   useEffect(() => {
//     const filtered = designs.filter((design) =>
//       design.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredDesigns(filtered);
//   }, [searchTerm, designs]);

//   const handleNext = () => {
//     if (activeStep < steps.length - 1) {
//       setActiveStep((prevStep) => prevStep + 1);
//     } else {
//       handleSubmit();
//     }
//   };

//   const handleBack = () => {
//     if (activeStep > 0) {
//       setActiveStep((prevStep) => prevStep - 1);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       await axios.post('http://localhost:8000/api/v1/products/', {
//         design_id: selectedDesign.id,
//         title: productTitle,
//         description: productDescription,
//       });
//       alert('Product created successfully!');
//       setActiveStep(0);
//       setSelectedDesign(null);
//       setProductTitle('');
//       setProductDescription('');
//     } catch (error) {
//       console.error('Error creating product:', error);
//       alert('Error creating product.');
//     }
//   };

//   return (
//     <Box p={4}>
//       <Typography variant="h4" gutterBottom>Create New Product</Typography>
//       <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
//         {steps.map((label, index) => (
//           <Step key={index}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       {activeStep === 0 && (
//         <Box>
//           <Autocomplete
//             options={designs}
//             getOptionLabel={(option) => option.title}
//             onInputChange={(e, value) => setSearchTerm(value)}
//             renderInput={(params) => (
//               <TextField {...params} label="Search Design" fullWidth margin="normal" />
//             )}
//           />
//           <Grid container spacing={2}>
//             {filteredDesigns.map((design) => (
//               <Grid item xs={12} sm={4} md={3} key={design.id}>
//                 <Card
//                   onClick={() => setSelectedDesign(design)}
//                   sx={{
//                     border: selectedDesign?.id === design.id ? '2px solid #4caf50' : '1px solid #ddd',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   <CardMedia
//                     component="img"
//                     height="140"
//                     image={design.design_image} // Assuming a thumbnail URL is provided in design data
//                     alt={design.title}
//                   />
//                   <CardContent>
//                     <Typography variant="subtitle1">{design.title}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>
//       )}

//       {activeStep === 1 && (
//         <Box>
//           <TextField
//             label="Product Title"
//             value={productTitle}
//             onChange={(e) => setProductTitle(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Product Description"
//             value={productDescription}
//             onChange={(e) => setProductDescription(e.target.value)}
//             fullWidth
//             margin="normal"
//             multiline
//             rows={4}
//             required
//           />
//         </Box>
//       )}

//       <Box display="flex" justifyContent="space-between" mt={4}>
//         <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleNext}
//           disabled={activeStep === 0 && !selectedDesign} // Disable "Next" if no design selected
//         >
//           {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default NewProductWizard;

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Modal,
//   Autocomplete,
//   Stepper,
//   Step,
//   StepLabel,
//   CircularProgress,
// } from '@mui/material';
// import axios from 'axios';

// const steps = ['Select Design', 'Enter Product Details'];

// const ProductCreationWizard = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [selectedDesign, setSelectedDesign] = useState(null);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [designs, setDesigns] = useState([]);
//   const [designQuery, setDesignQuery] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [loadingDesigns, setLoadingDesigns] = useState(true);

//   // Fetch designs based on search query or load initial designs if query is empty
//   const fetchDesigns = async (query = '') => {
//     setLoadingDesigns(true);
//     try {
//       const response = await axios.get(`http://localhost:8000/api/v1/designs/`, {
//         params: { search: query },
//       });
//       setDesigns(response.data);
//     } catch (error) {
//       console.error("Error fetching designs:", error);
//     } finally {
//       setLoadingDesigns(false);
//     }
//   };

//   useEffect(() => {
//     fetchDesigns(); // Load designs on initial render
//   }, []);

//   // Handle design search when query changes
//   useEffect(() => {
//     if (designQuery) {
//       fetchDesigns(designQuery);
//     }
//   }, [designQuery]);

//   const handleDesignSelect = (design) => {
//     setSelectedDesign(design);
//   };

//   const handleNext = () => {
//     if (activeStep === 0 && !selectedDesign) {
//       alert("Please select a design to proceed.");
//     } else {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     setModalOpen(true);
//     try {
//       const payload = {
//         title,
//         description,
//         status: 'New',
//         product_category: null,
//         designs: selectedDesign ? selectedDesign.id : null,
//         mockups: [],
//         mockup_libraries: []
//       };
//       await axios.post('http://localhost:8000/api/v1/products/', payload);
//       alert("Product created successfully!");
//     } catch (error) {
//       console.error("Error creating product:", error);
//     } finally {
//       setIsSubmitting(false);
//       setModalOpen(false);
//     }
//   };

//   return (
//     <Box p={4}>
//       <Typography variant="h4" mb={2}>Create New Product</Typography>
//       <Stepper activeStep={activeStep} alternativeLabel>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       {activeStep === 0 && (
//         <Box mt={4}>
//           <Autocomplete
//             options={designs}
//             getOptionLabel={(option) => option.title}
//             onInputChange={(e, value) => {
//               setDesignQuery(value); // Update the search query for designs
//             }}
//             renderInput={(params) => (
//               <TextField {...params} label="Search Designs" variant="outlined" fullWidth />
//             )}
//           />
//           {loadingDesigns ? (
//             <Box mt={2} display="flex" justifyContent="center">
//               <CircularProgress />
//             </Box>
//           ) : (
//             <Grid container spacing={2} mt={2}>
//               {designs.map((design) => (
//                 <Grid item xs={12} sm={6} md={4} key={design.id}>
//                   <Card
//                     onClick={() => handleDesignSelect(design)}
//                     sx={{
//                       border: selectedDesign?.id === design.id ? '2px solid #4caf50' : '1px solid #ddd',
//                       cursor: 'pointer',
//                     }}
//                   >
//                     <CardMedia
//                       component="img"
//                       height="140"
//                       image={design.design_image} // Ensure this matches your design image field
//                       alt={design.title}
//                     />
//                     <CardContent>
//                       <Typography variant="subtitle1">{design.title}</Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </Box>
//       )}

//       {activeStep === 1 && (
//         <Box mt={4}>
//           <TextField
//             label="Product Title"
//             variant="outlined"
//             fullWidth
//             required
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             label="Product Description"
//             variant="outlined"
//             fullWidth
//             multiline
//             rows={4}
//             required
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             margin="normal"
//           />
//         </Box>
//       )}

//       <Box display="flex" justifyContent="space-between" mt={4}>
//         <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
//         {activeStep === steps.length - 1 ? (
//           <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isSubmitting}>Submit</Button>
//         ) : (
//           <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
//         )}
//       </Box>

//       {/* Submission Progress Modal */}
//       <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 300,
//             bgcolor: 'background.paper',
//             p: 4,
//             borderRadius: 2,
//             boxShadow: 24,
//           }}
//         >
//           {isSubmitting ? (
//             <>
//               <CircularProgress />
//               <Typography mt={2}>Creating product...</Typography>
//             </>
//           ) : (
//             <Typography mt={2}>Product created successfully!</Typography>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default ProductCreationWizard;

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   Modal,
//   Autocomplete,
//   Stepper,
//   Step,
//   StepLabel,
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from '@mui/material';
// import axios from 'axios';

// const steps = ['Select Design', 'Enter Product Details', 'Choose Status and Category'];

// const ProductCreationWizard = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const [selectedDesign, setSelectedDesign] = useState(null);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [status, setStatus] = useState('');
//   const [category, setCategory] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [designs, setDesigns] = useState([]);
//   const [designQuery, setDesignQuery] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [loadingDesigns, setLoadingDesigns] = useState(true);

//   // Fetch designs based on search query or load initial designs if query is empty
//   const fetchDesigns = async (query = '') => {
//     setLoadingDesigns(true);
//     try {
//       const response = await axios.get(`http://localhost:8000/api/v1/designs/`, {
//         params: { search: query },
//       });
//       setDesigns(response.data);
//     } catch (error) {
//       console.error("Error fetching designs:", error);
//     } finally {
//       setLoadingDesigns(false);
//     }
//   };

//   // Fetch categories
//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/v1/categories/`);
//       setCategories(response.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   useEffect(() => {
//     fetchDesigns(); // Load designs on initial render
//     fetchCategories(); // Load categories on initial render
//   }, []);

//   // Handle design search when query changes
//   useEffect(() => {
//     if (designQuery) {
//       fetchDesigns(designQuery);
//     }
//   }, [designQuery]);

//   const handleDesignSelect = (design) => {
//     setSelectedDesign(design);
//   };

//   const handleNext = () => {
//     if (activeStep === 0 && !selectedDesign) {
//       alert("Please select a design to proceed.");
//     } else {
//       setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     }
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     setModalOpen(true);
//     try {
//       const payload = {
//         title,
//         description,
//         status: status || null,
//         product_category: category || null,
//         designs: selectedDesign ? selectedDesign.id : null,
//         mockups: [],
//         mockup_libraries: []
//       };
//       await axios.post('http://localhost:8000/api/v1/products/', payload);
//       alert("Product created successfully!");
//     } catch (error) {
//       console.error("Error creating product:", error);
//     } finally {
//       setIsSubmitting(false);
//       setModalOpen(false);
//     }
//   };

//   return (
//     <Box p={4}>
//       <Typography variant="h4" mb={2}>Create New Product</Typography>
//       <Stepper activeStep={activeStep} alternativeLabel>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       {activeStep === 0 && (
//         <Box mt={4}>
//           <Autocomplete
//             options={designs}
//             getOptionLabel={(option) => option.title}
//             onInputChange={(e, value) => {
//               setDesignQuery(value); // Update the search query for designs
//             }}
//             renderInput={(params) => (
//               <TextField {...params} label="Search Designs" variant="outlined" fullWidth />
//             )}
//           />
//           {loadingDesigns ? (
//             <Box mt={2} display="flex" justifyContent="center">
//               <CircularProgress />
//             </Box>
//           ) : (
//             <Grid container spacing={2} mt={2}>
//               {designs.map((design) => (
//                 <Grid item xs={12} sm={6} md={4} key={design.id}>
//                   <Card
//                     onClick={() => handleDesignSelect(design)}
//                     sx={{
//                       border: selectedDesign?.id === design.id ? '2px solid #4caf50' : '1px solid #ddd',
//                       cursor: 'pointer',
//                     }}
//                   >
//                     <CardMedia
//                       component="img"
//                       height="140"
//                       image={design.design_image}
//                       alt={design.title}
//                     />
//                     <CardContent>
//                       <Typography variant="subtitle1">{design.title}</Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           )}
//         </Box>
//       )}

//       {activeStep === 1 && (
//         <Box mt={4}>
//           <TextField
//             label="Product Title"
//             variant="outlined"
//             fullWidth
//             required
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             margin="normal"
//           />
//           <TextField
//             label="Product Description"
//             variant="outlined"
//             fullWidth
//             multiline
//             rows={4}
//             required
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             margin="normal"
//           />
//         </Box>
//       )}

//       {activeStep === 2 && (
//         <Box mt={4}>
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Status</InputLabel>
//             <Select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               label="Status"
//               required
//             >
//               <MenuItem value="Active">Active</MenuItem>
//               <MenuItem value="Inactive">Inactive</MenuItem>
//               <MenuItem value="Archived">Archived</MenuItem>
//             </Select>
//           </FormControl>
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Category</InputLabel>
//             <Select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               label="Category"
//               required
//             >
//               {categories.map((cat) => (
//                 <MenuItem key={cat.id} value={cat.id}>
//                   {cat.title}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>
//       )}

//       <Box display="flex" justifyContent="space-between" mt={4}>
//         <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
//         {activeStep === steps.length - 1 ? (
//           <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isSubmitting}>Submit</Button>
//         ) : (
//           <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
//         )}
//       </Box>

//       {/* Submission Progress Modal */}
//       <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 300,
//             bgcolor: 'background.paper',
//             p: 4,
//             borderRadius: 2,
//             boxShadow: 24,
//           }}
//         >
//           {isSubmitting ? (
//             <>
//               <CircularProgress />
//               <Typography mt={2}>Creating product...</Typography>
//             </>
//           ) : (
//             <Typography mt={2}>Product created successfully!</Typography>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default ProductCreationWizard;

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
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
            onInputChange={(e, value) => {
              setDesignQuery(value); // Update the search query for designs
            }}
            renderInput={(params) => (
              <TextField {...params} label="Search Designs" variant="outlined" fullWidth />
            )}
          />
          {loadingDesigns ? (
            <Box mt={2} display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2} mt={2}>
              {designs.map((design) => (
                <Grid item xs={12} sm={6} md={4} key={design.id}>
                  <Card
                    onClick={() => handleDesignSelect(design)}
                    sx={{
                      border: selectedDesign?.id === design.id ? '2px solid #4caf50' : '1px solid #ddd',
                      cursor: 'pointer',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={design.design_image}
                      alt={design.title}
                    />
                    <CardContent>
                      <Typography variant="subtitle1">{design.title}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
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

export default ProductCreationWizard