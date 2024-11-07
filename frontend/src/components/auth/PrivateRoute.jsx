// src/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
    const accessToken = localStorage.getItem('access');

    return accessToken ? children : <Navigate to="/" />;
};

// Validate the props
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;