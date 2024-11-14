import  useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductMockupLibraries = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [libraryTitles, setLibraryTitles] = useState({}); // Store library titles by ID

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/products/${productId}`);
        setProductData(response.data);

        // Get unique library IDs from library_product_images
        const libraryIds = [...new Set(response.data.library_product_images.map(image => image.library))];

        // Fetch titles for each library
        const titlePromises = libraryIds.map(async (libraryId) => {
          const libraryResponse = await axios.get(`http://localhost:8000/api/v1/mockups/library/${libraryId}`);
          return { id: libraryId, title: libraryResponse.data.title };
        });

        // Store fetched titles in state
        const titles = await Promise.all(titlePromises);
        const titlesMap = titles.reduce((acc, library) => {
          acc[library.id] = library.title;
          return acc;
        }, {});
        setLibraryTitles(titlesMap);

      } catch (error) {
        console.error("Error fetching product or library data:", error);
      }
    };

    fetchProductData();
  }, [productId]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Product Mockup Libraries</h3>
      {Object.keys(libraryTitles).map((libraryId) => (
        <div key={libraryId} style={{ border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
          {/* Library title */}
          <h4>{libraryTitles[libraryId]}</h4>
          
          {/* Images associated with this library */}
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {productData.library_product_images
              .filter(image => image.library === parseInt(libraryId))
              .map(image => (
                <img 
                  key={image.id} 
                  src={image.image_path} 
                  alt={`Mockup ${image.mockup}`} 
                  style={{ width: '150px', height: '150px', margin: '10px' }} 
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductMockupLibraries;