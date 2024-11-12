import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/pages/Login.jsx';
import SideNavBar from './components/navigation/SideNavBar.jsx';
import AppHome from './components/pages/appHome.jsx';
import Designs from './components/pages/Designs.jsx';
import DesignDetails from './components/datagrids/DesignDetails.jsx';
import CreateDesignForm from './components/forms/CreateDesignForm.jsx';
import Mockups from './components/pages/Mockups.jsx';
import CreateMockup from './components/pages/CreateMockup.jsx';
import MockupLibraries from './components/pages/MockupLibraries.jsx';
import MockupLibraryDetails from './components/details/MockupLibraryDetails.jsx';
import Products from './components/pages/Products.jsx';
import CreateMockupLibrary from './components/pages/CreateMockupLibrary.jsx';
import NewProductWizard from './components/wizards/NewProductWizard.jsx';
import ProductDetail from './components/details/ProductDetail.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  const location = useLocation();
  const noNavBar = location.pathname === '/'

  return (
    <>
      {
        noNavBar ? (
          <Routes>
            <Route path='/' element={<Login />} />
          </Routes>
        ) : (
          <SideNavBar
            content={
              <Routes>
                <Route path='/apphome' element={<AppHome />} />
                <Route path='/apphome' element={<AppHome />} />
                <Route path='/designs' element={<Designs />} />
                <Route path="/designs/:design_id" element={<DesignDetails />} />
                <Route path="/designs/new" element={<CreateDesignForm />} />
                <Route path='/mockups' element={<Mockups />} />
                <Route path='/mockups/new' element={<CreateMockup />} />
                <Route path='/mockups/libraries' element={<MockupLibraries />} />
                <Route path="/mockups/libraries/:libraryId" element={<MockupLibraryDetails />} />
                <Route path="/mockups/libraries/new" element={<CreateMockupLibrary />} />
                <Route path='/products' element={<Products />} />
                <Route path="/products/:productId" element={<ProductDetail />} />



                <Route path='/sandbox' element={<NewProductWizard />} />
              </Routes>
            }
          />
        )
      }
    </>
  );
}

export default App;