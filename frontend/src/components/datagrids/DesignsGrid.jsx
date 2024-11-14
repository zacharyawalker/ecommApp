// import { useEffect, useState } from 'react';
// import DesignsAxios from '../axios/DesignsAxios';
// import { DataGrid } from '@mui/x-data-grid';
// import { Typography, IconButton, Box, Alert, Button } from '@mui/material';
// import { useNavigate, useLocation } from 'react-router-dom';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const DesignsGrid = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [designs, setDesigns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showSuccess, setShowSuccess] = useState(location.state?.success || false);

//   useEffect(() => {
//     fetchDesigns();
//   }, []);

//   useEffect(() => {
//     if (showSuccess) {
//       const timer = setTimeout(() => {
//         setShowSuccess(false);
//         navigate('/designs', { state: {} });
//       }, 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [showSuccess, navigate]);

//   const fetchDesigns = async () => {
//     try {
//       const response = await DesignsAxios.get('/');
//       setDesigns(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching designs:", error);
//       setLoading(false);
//     }
//   };

//   const handleEdit = (id) => {
//     navigate(`/designs/${id}`);
//   };

//   const columns = [
//     {
//       field: 'design_image',
//       headerName: 'Thumbnail',
//       width: 100,
//       renderCell: (params) => (
//         <img
//           src={params.value}
//           alt="Design Thumbnail"
//           style={{ width: 50, height: 50, objectFit: 'cover', cursor: 'pointer' }}
//           onClick={() => navigate(`/designs/${params.row.id}`)}
//         />
//       ),
//     },
//     {
//       field: 'title',
//       headerName: 'Title',
//       width: 200,
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 150,
//       sortable: false,
//       renderCell: (params) => (
//         <div>
//           <IconButton onClick={() => handleEdit(params.id)} color="primary">
//             <EditIcon />
//           </IconButton>
//           <IconButton onClick={() => console.log(`Delete design with ID: ${params.id}`)} color="secondary">
//             <DeleteIcon />
//           </IconButton>
//         </div>
//       ),
//     },
//   ];

//   const rows = designs.map((design) => ({
//     id: design.id,
//     design_image: design.design_image,
//     title: design.title,
//   }));

//   return (
//     <Box p={4}>
//       {/* Success Alert */}
//       {showSuccess && (
//         <Alert
//           severity="success"
//           onClose={() => setShowSuccess(false)}
//           sx={{ mb: 2 }}
//         >
//           Design Upload Successful
//         </Alert>
//       )}

//       {/* Header with "Create New Design" button */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h5">Designs</Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => navigate('/designs/new')}
//         >
//           Upload New Design
//         </Button>
//       </Box>

//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={10}
//         loading={loading}
//         disableSelectionOnClick
//         autoHeight
//       />
//     </Box>
//   );
// };

// export default DesignsGrid;

import { useEffect, useState } from 'react';
import DesignsAxios from '../axios/DesignsAxios';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, IconButton, Box, Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DesignsGrid = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(location.state?.success || false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [designToDelete, setDesignToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchDesigns();
  }, []);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        navigate('/designs', { state: {} });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, navigate]);

  const fetchDesigns = async () => {
    try {
      const response = await DesignsAxios.get('/');
      setDesigns(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching designs:", error);
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/designs/${id}`);
  };

  const openDeleteDialog = (id) => {
    setDesignToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!designToDelete) return;

    setDeleting(true);
    try {
      await DesignsAxios.delete(`/${designToDelete}/`);
      setDesigns((prevDesigns) => prevDesigns.filter((design) => design.id !== designToDelete));
      setShowSuccess(true); // Optional: Show a success message
    } catch (error) {
      console.error("Error deleting design:", error);
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setDesignToDelete(null);
    }
  };

  const columns = [
    {
      field: 'design_image',
      headerName: 'Thumbnail',
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Design Thumbnail"
          style={{ width: 50, height: 50, objectFit: 'cover', cursor: 'pointer' }}
          onClick={() => navigate(`/designs/${params.row.id}`)}
        />
      ),
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEdit(params.id)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => openDeleteDialog(params.id)} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const rows = designs.map((design) => ({
    id: design.id,
    design_image: design.design_image,
    title: design.title,
  }));

  return (
    <Box p={4}>
      {showSuccess && (
        <Alert
          severity="success"
          onClose={() => setShowSuccess(false)}
          sx={{ mb: 2 }}
        >
          Design Upload Successful
        </Alert>
      )}

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Designs</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/designs/new')}
        >
          Upload New Design
        </Button>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        loading={loading}
        disableSelectionOnClick
        autoHeight
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Design</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this design? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="secondary" disabled={deleting}>
            {deleting ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DesignsGrid;