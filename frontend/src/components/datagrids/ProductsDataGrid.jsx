// // import { useState, useEffect } from 'react';
// // import ProductAxios from '../axios/ProductsAxios'
// // import { DataGrid } from '@mui/x-data-grid';
// // import { IconButton, Avatar } from '@mui/material';
// // import EditIcon from '@mui/icons-material/Edit';
// // import DeleteIcon from '@mui/icons-material/Delete';

// // // Fallback image URL
// // const DEFAULT_THUMBNAIL = '/path/to/generic-image.jpg';

// // function ProductsDataGrid() {
// //   const [products, setProducts] = useState([]);
// //   const [categoryTitles, setCategoryTitles] = useState({}); // To store category titles by ID

// //   useEffect(() => {
// //     // Fetch all products
// //     ProductAxios.get('/')
// //       .then((response) => setProducts(response.data))
// //       .catch((error) => console.error('Error fetching products:', error));
// //   }, []);

// //   // Fetch category title by ID and store it in state
// //   const fetchCategoryTitle = async (categoryId) => {
// //     if (!categoryTitles[categoryId]) {
// //       try {
// //         const response = await ProductAxios.get(`/categories/${categoryId}`);
// //         setCategoryTitles((prevTitles) => ({
// //           ...prevTitles,
// //           [categoryId]: response.data.title,
// //         }));
// //       } catch (error) {
// //         console.error(`Error fetching category title for ID ${categoryId}:`, error);
// //       }
// //     }
// //   };

// //   // Determine thumbnail image based on product's mockups and libraries
// //   const getThumbnail = (product) => {
// //     if (product.product_images.length > 0) {
// //       return product.product_images[0].image_path;  // First mockup image
// //     } else if (product.library_product_images.length > 0) {
// //       return product.library_product_images[0].image_path;  // First library mockup image
// //     }
// //     return DEFAULT_THUMBNAIL;  // Generic image if no mockup or library images
// //   };

// //   // Define columns for the DataGrid
// //   const columns = [
// //     {
// //       field: 'thumbnail',
// //       headerName: 'Thumbnail',
// //       width: 100,
// //       renderCell: (params) => (
// //         <Avatar src={getThumbnail(params.row)} alt="Product Thumbnail" />
// //       ),
// //       sortable: false,
// //       filterable: false,
// //     },
// //     { field: 'title', headerName: 'Title', width: 200 },
// //     {
// //       field: 'product_category',
// //       headerName: 'Category',
// //       width: 150,
// //       renderCell: (params) => {
// //         const categoryId = params.row.product_category;
// //         fetchCategoryTitle(categoryId);  // Fetch title if not already cached

// //         return categoryTitles[categoryId] || "Loading..."; // Display title or loading state
// //       },
// //     },
// //     { field: 'status', headerName: 'Status', width: 130 },
// //     {
// //       field: 'actions',
// //       headerName: 'Actions',
// //       width: 120,
// //       renderCell: (params) => (
// //         <>
// //           <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
// //             <EditIcon />
// //           </IconButton>
// //           <IconButton color="secondary" onClick={() => handleDelete(params.row.id)}>
// //             <DeleteIcon />
// //           </IconButton>
// //         </>
// //       ),
// //       sortable: false,
// //       filterable: false,
// //     },
// //   ];

// //   // Sample edit and delete handlers
// //   const handleEdit = (id) => {
// //     console.log('Edit product:', id);
// //   };

// //   const handleDelete = (id) => {
// //     console.log('Delete product:', id);
// //   };

// //   return (
// //     <div style={{ height: 600, width: '100%' }}>
// //       <DataGrid
// //         rows={products}
// //         columns={columns}
// //         pageSize={10}
// //         getRowId={(row) => row.id}
// //       />
// //     </div>
// //   );
// // }

// // export default ProductsDataGrid;


// import { useState, useEffect } from 'react';
// import ProductAxios from '../axios/ProductsAxios';
// import { DataGrid } from '@mui/x-data-grid';
// import {
//   IconButton,
//   Avatar,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Button,
//   Checkbox,
//   FormControlLabel,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const DEFAULT_THUMBNAIL = '/path/to/generic-image.jpg';

// function ProductsDataGrid() {
//   const [products, setProducts] = useState([]);
//   const [categoryTitles, setCategoryTitles] = useState({});
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);
//   const [deleteConfirmed, setDeleteConfirmed] = useState(false);

//   useEffect(() => {
//     ProductAxios.get('/')
//       .then((response) => setProducts(response.data))
//       .catch((error) => console.error('Error fetching products:', error));
//   }, []);

//   const fetchCategoryTitle = async (categoryId) => {
//     if (!categoryTitles[categoryId]) {
//       try {
//         const response = await ProductAxios.get(`/categories/${categoryId}`);
//         setCategoryTitles((prevTitles) => ({
//           ...prevTitles,
//           [categoryId]: response.data.title,
//         }));
//       } catch (error) {
//         console.error(`Error fetching category title for ID ${categoryId}:`, error);
//       }
//     }
//   };

//   const getThumbnail = (product) => {
//     if (product.product_images.length > 0) {
//       return product.product_images[0].image_path;
//     } else if (product.library_product_images.length > 0) {
//       return product.library_product_images[0].image_path;
//     }
//     return DEFAULT_THUMBNAIL;
//   };

//   const columns = [
//     {
//       field: 'thumbnail',
//       headerName: 'Thumbnail',
//       width: 100,
//       renderCell: (params) => (
//         <Avatar src={getThumbnail(params.row)} alt="Product Thumbnail" />
//       ),
//       sortable: false,
//       filterable: false,
//     },
//     { field: 'title', headerName: 'Title', width: 200 },
//     {
//       field: 'product_category',
//       headerName: 'Category',
//       width: 150,
//       renderCell: (params) => {
//         const categoryId = params.row.product_category;
//         fetchCategoryTitle(categoryId);
//         return categoryTitles[categoryId] || 'Loading...';
//       },
//     },
//     { field: 'status', headerName: 'Status', width: 130 },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 120,
//       renderCell: (params) => (
//         <>
//           <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
//             <EditIcon />
//           </IconButton>
//           <IconButton color="secondary" onClick={() => openDeleteModal(params.row.id)}>
//             <DeleteIcon />
//           </IconButton>
//         </>
//       ),
//       sortable: false,
//       filterable: false,
//     },
//   ];

//   const handleEdit = (id) => {
//     console.log('Edit product:', id);
//   };

//   const openDeleteModal = (id) => {
//     setProductToDelete(id);
//     setDeleteModalOpen(true);
//     setDeleteConfirmed(false);
//   };

//   const handleDelete = async () => {
//     try {
//       await ProductAxios.delete(`/${productToDelete}/`);
//       setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productToDelete));
//       setDeleteModalOpen(false);
//     } catch (error) {
//       console.error(`Error deleting product ID ${productToDelete}:`, error);
//     }
//   };

//   return (
//     <div style={{ height: 600, width: '100%' }}>
//       <DataGrid rows={products} columns={columns} pageSize={10} getRowId={(row) => row.id} />

//       <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
//         <DialogTitle>Delete Product</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this product? This action cannot be undone.
//           </DialogContentText>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={deleteConfirmed}
//                 onChange={(e) => setDeleteConfirmed(e.target.checked)}
//               />
//             }
//             label="I understand a deleted product cannot be restored"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
//           <Button
//             color="secondary"
//             onClick={handleDelete}
//             disabled={!deleteConfirmed}
//           >
//             Yes, Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default ProductsDataGrid;

// ProductsDataGrid.js

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
    if (categoryId && !categoryTitles[categoryId]) {
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
        const categoryId = params.row.product_category?.id || params.row.product_category;
        
        if (categoryId) {
          fetchCategoryTitle(categoryId);  // Fetch title if not already cached
          return categoryTitles[categoryId] || "Loading..."; // Display title or loading state
        }
        return "N/A"; // Display N/A if no category is associated
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