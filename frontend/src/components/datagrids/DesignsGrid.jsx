import { useEffect, useState } from 'react';
import DesignsAxios from '../../axios/DesignsAxios';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Box, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DesignsGrid = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(location.state?.success || false);

  useEffect(() => {
    fetchDesigns();
  }, []);

  useEffect(() => {
    // Automatically hide the success banner after 5 seconds
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        navigate('/designs', { state: {} });
      }, 5000);
      return () => clearTimeout(timer); // Clear timeout if the component unmounts
    }
  }, [showSuccess, navigate]);

  const fetchDesigns = async () => {
    try {
      const response = await DesignsAxios.get('');
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
          <IconButton onClick={() => console.log(`Delete design with ID: ${params.id}`)} color="secondary">
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
      {/* Success Alert */}
      {showSuccess && (
        <Alert
          severity="success"
          onClose={() => setShowSuccess(false)}
          sx={{ mb: 2 }}
        >
          Design Upload Successful
        </Alert>
      )}
      
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        loading={loading}
        disableSelectionOnClick
        autoHeight
      />
    </Box>
  );
};

export default DesignsGrid;