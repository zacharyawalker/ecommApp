import { useState, useEffect } from 'react';
import ProductAxios from '../axios/ProductsAxios'
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Fallback image URL
const DEFAULT_THUMBNAIL = '/path/to/generic-image.jpg';

function ProductsDataGrid() {
  const [products, setProducts] = useState([]);
  const [categoryTitles, setCategoryTitles] = useState({}); // To store category titles by ID

  useEffect(() => {
    // Fetch all products
    ProductAxios.get('/')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Fetch category title by ID and store it in state
  const fetchCategoryTitle = async (categoryId) => {
    if (!categoryTitles[categoryId]) {
      try {
        const response = await ProductAxios.get(`/categories/${categoryId}`);
        setCategoryTitles((prevTitles) => ({
          ...prevTitles,
          [categoryId]: response.data.title,
        }));
      } catch (error) {
        console.error(`Error fetching category title for ID ${categoryId}:`, error);
      }
    }
  };

  // Determine thumbnail image based on product's mockups and libraries
  const getThumbnail = (product) => {
    if (product.product_images.length > 0) {
      return product.product_images[0].image_path;  // First mockup image
    } else if (product.library_product_images.length > 0) {
      return product.library_product_images[0].image_path;  // First library mockup image
    }
    return DEFAULT_THUMBNAIL;  // Generic image if no mockup or library images
  };

  // Define columns for the DataGrid
  const columns = [
    {
      field: 'thumbnail',
      headerName: 'Thumbnail',
      width: 100,
      renderCell: (params) => (
        <Avatar src={getThumbnail(params.row)} alt="Product Thumbnail" />
      ),
      sortable: false,
      filterable: false,
    },
    { field: 'title', headerName: 'Title', width: 200 },
    {
      field: 'product_category',
      headerName: 'Category',
      width: 150,
      renderCell: (params) => {
        const categoryId = params.row.product_category;
        fetchCategoryTitle(categoryId);  // Fetch title if not already cached

        return categoryTitles[categoryId] || "Loading..."; // Display title or loading state
      },
    },
    { field: 'status', headerName: 'Status', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  // Sample edit and delete handlers
  const handleEdit = (id) => {
    console.log('Edit product:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete product:', id);
  };

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={10}
        getRowId={(row) => row.id}
      />
    </div>
  );
}

export default ProductsDataGrid;